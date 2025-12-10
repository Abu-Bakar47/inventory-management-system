import "express";

declare module "express-serve-static-core" {
  interface Request {
    storeId?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
      role?: string;
      plan?: string;
    };
  }
}
