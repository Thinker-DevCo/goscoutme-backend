// File: src/decorators/authDecorator.ts

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware';


export function Authenticated(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req = args[0] as Request;
      const res = args[1] as Response;
      const next = args[2] as NextFunction;

      try {
        await new Promise<void>((resolve, reject) => {
          isAuthenticated(req, res, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        return originalMethod.apply(this, args);
      } catch (err) {
        next(err);
      }
    };

    return descriptor;
  };
}
