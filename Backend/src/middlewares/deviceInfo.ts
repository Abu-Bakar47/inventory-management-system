import { Request } from 'express';
import {UAParser} from 'ua-parser-js';
export const getDeviceInfo = (req: Request) => {
const parser = new UAParser(req.headers['user-agent']);
  const ua = parser.getResult();  
  return {
    deviceId: req.headers['device-id']?.toString() || 
              req.ip?.replace(/[.:]/g, '') || 
              'unknown',
    ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
    browser: ua.browser.name || 'Unknown',
    os: ua.os.name || 'Unknown',
    deviceName: `${ua.device.vendor || ''} ${ua.device.model || ''}`.trim() || 
                'Unknown Device'
  };
};

// import { Request } from 'express';
// import {UAParser} from 'ua-parser-js';

// export const getDeviceInfo = (req: Request) => {
//   // Create a new parser instance
//   const parser = new UAParser(req.headers['user-agent']);
//   const ua = parser.getResult();
  
//   // Generate a device ID based on user agent and IP
//   const deviceId = [req.ip, ua.browser.name, ua.os.name, ua.device.model]
//     .filter(Boolean)
//     .join('|')
//     .replace(/[^a-zA-Z0-9|]/g, '')
//     .substring(0, 100);

//   return {
//     deviceId,
//     ipAddress: req.ip || req.socket.remoteAddress || 'unknown',
//     browser: ua.browser.name || 'Unknown',
//     os: ua.os.name || 'Unknown',
//     deviceName: `${ua.device.vendor || ''} ${ua.device.model || ''}`.trim() || 
//                 'Unknown Device'
//   };
// };