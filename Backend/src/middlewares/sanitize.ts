// import { Request, Response, NextFunction } from 'express';
// import sanitize from 'mongo-sanitize';

// // Helper to recursively sanitize values without replacing the entire object
// function deepSanitize<T>(value: T): T {
//   if (value === null || value === undefined) {
//     return value;
//   }

//   if (Array.isArray(value)) {
//     return value.map(deepSanitize) as unknown as T;
//   }

//   if (typeof value === 'object') {
//     const sanitizedObj: Record<string, any> = {};
//     for (const [key, val] of Object.entries(value)) {
//       sanitizedObj[sanitize(key)] = deepSanitize(val);
//     }
//     return sanitizedObj as T;
//   }

//   if (typeof value === 'string') {
//     return sanitize(value) as unknown as T;
//   }

//   return value;
// }

// const mongoSanitize = () => {
//   return (req: Request, _res: Response, next: NextFunction) => {
//     // Create new sanitized objects instead of reassigning
//     if (req.query) req.query = deepSanitize(req.query);
//     if (req.body) req.body = deepSanitize(req.body);
//     if (req.params) req.params = deepSanitize(req.params);
//     next();
//   };
// };

// export default mongoSanitize;


// src/middlewares/sanitize.ts
import { Request, Response, NextFunction } from 'express';
import sanitize from 'mongo-sanitize';

function recursiveSanitize<T>(value: T): T {
  if (value === null || value === undefined) return value;

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(item => recursiveSanitize(item)) as unknown as T;
  }

  // Handle objects
  if (typeof value === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      const cleanKey = sanitize(key);
      sanitized[cleanKey] = recursiveSanitize(val);
    }
    return sanitized as T;
  }

  // Handle primitives
  return sanitize(value) as unknown as T;
}

const mongoSanitize = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    // Sanitize without reassignment
    if (req.query && Object.keys(req.query).length > 0) {
      for (const [key, value] of Object.entries(req.query)) {
        req.query[key] = recursiveSanitize(value);
      }
    }

    if (req.body && Object.keys(req.body).length > 0) {
      for (const [key, value] of Object.entries(req.body)) {
        req.body[key] = recursiveSanitize(value);
      }
    }

    if (req.params && Object.keys(req.params).length > 0) {
      for (const [key, value] of Object.entries(req.params)) {
        req.params[key] = recursiveSanitize(value);
      }
    }

    next();
  };
};

export default mongoSanitize;