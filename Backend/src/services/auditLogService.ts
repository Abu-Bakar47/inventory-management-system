import User from '../models/User';

export const logAction = async (
  userId: any,
  action: string,
  details?: string,
  ipAddress?: string
) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        auditLogs: {
          action,
          details,
          ipAddress,
          timestamp: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
};