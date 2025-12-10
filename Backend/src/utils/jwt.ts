// import dotenv from 'dotenv';
// dotenv.config();
// import jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// export function signJwt(payload: object) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// }

// export function verifyJwt<T = any>(token: string): T {
//   return jwt.verify(token, JWT_SECRET) as T;
// }


import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

export function signJwt(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
  });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}