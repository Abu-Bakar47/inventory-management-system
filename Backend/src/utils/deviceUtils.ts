import { Request } from 'express';
import User from '../models/User';

export const validateDevice = async (req: Request) => {
  const deviceId = req.headers['x-device-id'] as string;
  const deviceType = req.headers['x-device-type'] as 'mobile' | 'desktop';

  if (!deviceId || !deviceType) {
    throw new Error('Device identification required');
  }

  const user = User.find({_id:req.user?.id});
  const existingDevice = user?.devices.find((d:any) => d.deviceId === deviceId);

  if (!existingDevice) {
    // Check device limits
    const deviceCount = user.devices.filter((d:any) => d.deviceType === deviceType).length;

    if (deviceCount >= 1) {
      throw new Error(`Maximum 1 ${deviceType} device allowed`);
    }

    // Add new device
    user.devices.push({ deviceId, deviceType });
    await user.save();
  }

  return deviceType;
};

export const getDeviceInfo = (req: Request) => {
  const deviceId = req.headers['x-device-id'] as string || 'unknown';
  const deviceType = req.headers['x-device-type'] as 'mobile' | 'desktop' || 'desktop';
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  return {
    deviceId,
    deviceType,
    userAgent
  };
};