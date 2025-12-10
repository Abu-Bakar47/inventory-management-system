// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

// export const registerUser = async (
//   name: string,
//   email: string,
//   mobile: string,
//   password: string,
// ) => {
//   // const existingUser = await User.findOne({ email });
//   const existingUser = await User.findOne({
//     $or: [{ email }, { mobile }],
//   });
//   if (existingUser) throw new Error('Email already registered');

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   return await User.create({
//     name,
//     email,
//     mobile,
//     password: hashedPassword,
//     acceptedTerms: true,
//   });
// };

// export const loginUser = async (email: string, password: string) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error('Invalid credentials');

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error('Invalid credentials');

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//     expiresIn: '30d',
//   });

//   return token;
// };

// export const selectPlan = async (
//   userId: string,
//   planId: string,
//   transactionDetails: {
//     transactionId: string;
//     screenshot: string;
//     amount: number;
//   },
// ) => {
//   // Implementation for payment handling
// };


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { logAction } from './auditLogService';
import { sendPasswordResetEmail, sendVerificationEmail } from './emailService';

export const registerUser = async (
  name: string,
  email: string,
  mobile: string,
  password: string,
  deviceInfo: any
) => {
  // Check existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { mobile }],
  });
  if (existingUser) throw new Error('User already exists with this email/mobile');

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Create user
  const user = await User.create({
    name,
    email,
    mobile,
    password,
    acceptedTerms: true,
    verificationToken,
    devices: [{
      deviceId: deviceInfo.deviceId,
      ipAddress: deviceInfo.ipAddress,
      browser: deviceInfo.browser,
      operatingSystem: deviceInfo.os,
      deviceName: deviceInfo.deviceName,
      isCurrentDevice: true,
      addedAt: new Date(),
      lastLogin: new Date(),
    }],
  });

  // Add audit log
  await logAction(user._id, 'register', `User registered from ${deviceInfo.deviceName}`, deviceInfo.ipAddress);

  // Send verification email
  await sendVerificationEmail(email, verificationToken);

  return user;
};

export const loginUser = async (
  email: string,
  password: string,
  deviceInfo: any
) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  // Account lock check
  if (user.isAccountLocked()) {
    await logAction(user._id, 'login_attempt', 'Account locked', deviceInfo.ipAddress);
    throw new Error('Account is locked. Try again later');
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    // Increment failed attempts
    user.failedLoginAttempts += 1;
    
    // Lock account after 5 failed attempts
    if (user.failedLoginAttempts >= 5) {
      user.accountLocked = true;
      user.accountLockedUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      await logAction(user._id, 'account_lock', 'Too many failed attempts', deviceInfo.ipAddress);
    }
    
    await user.save();
    throw new Error('Invalid credentials');
  }

  // Reset security counters
  user.failedLoginAttempts = 0;
  user.accountLocked = false;
  user.lastLogin = new Date();

  // Device management
  const existingDevice = user.devices.find(d => d.deviceId === deviceInfo.deviceId);
  
  if (existingDevice) {
    // Update existing device
    existingDevice.lastLogin = new Date();
    existingDevice.isCurrentDevice = true;
    existingDevice.ipAddress = deviceInfo.ipAddress;
  } else {
    // Check device limit
    if (user.devices.length >= user.maxDevices) {
      throw new Error('Device limit reached. Please remove old devices');
    }
    
    // Add new device
    user.devices.push({
      deviceId: deviceInfo.deviceId,
      ipAddress: deviceInfo.ipAddress,
      browser: deviceInfo.browser,
      operatingSystem: deviceInfo.os,
      deviceName: deviceInfo.deviceName,
      isCurrentDevice: true,
      addedAt: new Date(),
      lastLogin: new Date(),
    });
  }

  // Save user updates
  await user.save();
  
  // Add audit log
  await logAction(user._id, 'login', `Logged in from ${deviceInfo.deviceName}`, deviceInfo.ipAddress);

  // Generate JWT
  const token = jwt.sign({ 
    id: user._id,
    role: user.role,
    email: user.email 
  }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });

  return { token, user };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return; // Don't reveal non-existent users

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  // Add audit log
  await logAction(user._id, 'password_reset_request', 'Password reset requested');

  // Send email
  await sendPasswordResetEmail(email, resetToken);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new Error('Invalid or expired token');

  // Update password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  
  await user.save();

  // Add audit log
  await logAction(user._id, 'password_reset', 'Password reset successfully');
};

export const verifyEmail = async (token: string) => {
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw new Error('Invalid verification token');

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // Add audit log
  await logAction(user._id, 'email_verified', 'Email verified successfully');
};