// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validateDevice } from '../utils/deviceUtils';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      deviceType?: 'mobile' | 'desktop';
    }
  }
}

// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) throw new Error('Authentication required');

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) throw new Error('User not found');

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export const deviceGuard = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const deviceId = req.headers['x-device-id'] as string;
//     const deviceType = req.headers['x-device-type'] as 'mobile' | 'desktop';

//     if (!deviceId || !deviceType) {
//       return res.status(400).json({ message: 'Device identification required' });
//     }

//     const user = req.user;
//     const existingDevice = user.devices.find(
//       (d: any) => d.deviceId === deviceId
//     );

//     if (!existingDevice) {
//       // Check device limits
//       const deviceCount = user.devices.filter(
//         (d: any) => d.deviceType === deviceType
//       ).length;

//       if (deviceCount >= 1) {
//         return res.status(403).json({
//           message: `Maximum 1 ${deviceType} device allowed. Logout from other devices.`
//         });
//       }

//       // Add new device
//       user.devices.push({ deviceId, deviceType });
//       await user.save();
//     }

//     req.deviceType = deviceType;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: 'Device validation failed' });
//   }
// };

export const deviceGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateDevice(req);
    next();
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};