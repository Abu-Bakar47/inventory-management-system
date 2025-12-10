// import { Request, Response } from 'express';
// import { registerUser, loginUser } from '../services/authService';
// import { validationResult } from 'express-validator';
// import Plan from '../models/Plan';
// import { createStore } from '../services/storeService';

// export const register = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, email, mobile, password, address, storeName } = req.body;
//     console.log({
//       name,
//       email,
//       mobile,
//       address,
//       password
//     })
//     const user = await registerUser(name, email, mobile, password);
//     if (user) {
//       const store = await createStore(user?._id as string, address, storeName);
//       console.log(`Store created ${store}`)
//     }
//     res.status(201).json({ id: user._id, email: user.email });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { email, password } = req.body;
//     const token = await loginUser(email, password);

//     res.cookie('jwt', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     res.json({ message: 'Login successful' });
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// };

// export const getPricing = async (req: Request, res: Response) => {
//   try {
//     const plans = await Plan.find();
//     res.json(plans);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { Request, Response } from 'express';
import { 
  registerUser, 
  loginUser, 
  forgotPassword,
  resetPassword,
  verifyEmail
} from '../services/authService';
import { validationResult } from 'express-validator';
import Plan from '../models/Plan';
import { createStore } from '../services/storeService';
import { getDeviceInfo } from '../middlewares/deviceInfo';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, mobile, password, address, storeName } = req.body;
    const deviceInfo = getDeviceInfo(req);

    const user = await registerUser(
      name, 
      email, 
      mobile, 
      password,
      deviceInfo
    );

    // Create store
    await createStore(user._id as string, address, storeName);

    res.status(201).json({ 
      id: user._id, 
      email: user.email,
      message: 'Verification email sent'
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const deviceInfo = getDeviceInfo(req);

    const { token, user } = await loginUser(email, password, deviceInfo);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ 
      message: 'Login successful',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
};

export const getPricing = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await forgotPassword(email);
    res.json({ message: 'Password reset email sent if account exists' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handlePasswordReset = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.json({ message: 'Password reset successful' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    await verifyEmail(token);
    res.json({ message: 'Email verified successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};