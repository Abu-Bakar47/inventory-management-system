// // src/models/User.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   mobile: string;
//   password: string;
//   acceptedTerms: boolean;
//   devices: Array<{
//     deviceId: string;
//     deviceType: 'mobile' | 'desktop';
//     lastLogin: Date;
//   }>;
//   plan?: mongoose.Types.ObjectId;
//   paymentStatus: 'pending' | 'completed';
//   role: string;
// }

// const UserSchema: Schema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     acceptedTerms: { type: Boolean, default: false },
//     devices: {
//       type: [{
//         deviceId: { type: String, required: true },
//         deviceType: { type: String, enum: ['mobile', 'desktop'], required: true },
//         lastLogin: { type: Date, default: Date.now },
//       }],
//       default: [],
//     },
//     plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
//     paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
//     role:{ type: String, enum:["user", "admin"], default:"user"}
//   },
//   { timestamps: true },
// );

// export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Define device schema
const deviceSchema = new Schema({
  deviceId: { type: String, required: true },
  deviceToken: { type: String },
  lastLogin: { type: Date, default: Date.now },
  isCurrentDevice: { type: Boolean, default: false },
  ipAddress: { type: String },
  browser: { type: String },
  operatingSystem: { type: String },
  deviceName: { type: String, default: 'Unknown Device' },
  addedAt: { type: Date, default: Date.now },
});

// Define audit log schema
const auditLogSchema = new Schema({
  action: {
    type: String,
    enum: ['login', 'register', 'password_reset', 'plan_change', 'store_create'],
    required: true,
  },
  ipAddress: { type: String },
  details: String,
  timestamp: { type: Date, default: Date.now },
});

export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  acceptedTerms: boolean;
  plan?: mongoose.Types.ObjectId;
  paymentStatus: 'pending' | 'completed';
  role: string;
  stores: Types.ObjectId[];

  // Security fields
  failedLoginAttempts: number;
  lastLogin: Date;
  accountLocked: boolean;
  accountLockedUntil?: Date;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // Device management
  maxDevices: number;
  devices: mongoose.Types.DocumentArray<{
    deviceId: string;
    deviceToken?: string;
    lastLogin: Date;
    isCurrentDevice: boolean;
    ipAddress?: string;
    browser?: string;
    operatingSystem?: string;
    deviceName: string;
    addedAt: Date;
  }>;

  // Audit logs
  auditLogs: mongoose.Types.DocumentArray<{
    action: string;
    ipAddress?: string;
    details?: string;
    timestamp: Date;
  }>;

  // Methods
  comparePassword(enteredPassword: string): Promise<boolean>;
  isAccountLocked(): boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    acceptedTerms: { type: Boolean, default: false, required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
    // Security fields
    failedLoginAttempts: { type: Number, default: 0 },
    accountLocked: { type: Boolean, default: false },
    lastLogin: { type: Date },
    accountLockedUntil: Date,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Device management
    maxDevices: { type: Number, default: 3, min: 1, max: 10 },
    devices: [deviceSchema],

    // Audit logs
    auditLogs: [auditLogSchema],
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as any, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Password comparison method
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Account lock check method
UserSchema.methods.isAccountLocked = function (): boolean {
  return this.accountLocked && this.accountLockedUntil > new Date();
};

export default mongoose.model<IUser>('User', UserSchema);
