// import {verifyJwt}  from "../utils/jwt";
// import { NextFunction, Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";

// export function auth(required = true) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       if (!required) return next();
//       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Missing Authorization header" });
//     }
//     const token = authHeader.replace(/^Bearer\s+/, "");
//     console.log("Token:", token);
//     if (!token) {
//       if (!required) return next();
//       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Missing token" });
//     }
//     try {
//       const payload = verifyJwt<{ id: string; email: string; role: string }>(token);
//       console.log("Payload:", payload);
//       req.user = { id: payload.id, email: payload.email, role: payload.role };
//       next();
//     } catch (e) {
//       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid or expired token" });
//     }
//   };
// }


import { verifyJwt } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function auth(required = true) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Read token from cookies instead of Authorization header
    const token = req.cookies?.jwt;
    
    console.log("Token from cookie:", token);
    
    if (!token) {
      if (!required) return next();
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        message: "Authentication required - no token found" 
      });
    }

    try {
      const payload = verifyJwt<{ id: string; email: string; role: string }>(token);
      console.log("Payload:", payload);
      req.user = { id: payload.id, email: payload.email, role: payload.role };
      next();
    } catch (e) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        message: "Invalid or expired token" 
      });
    }
  };
}