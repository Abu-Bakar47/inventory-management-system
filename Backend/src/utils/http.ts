import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export function asyncHandler(fn: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFound(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  if (process.env.NODE_ENV !== "test") {
    console.error("❌", err);
  }
  res.status(status).json({ message, ...(process.env.NODE_ENV !== "production" && { stack: err.stack }) });
}