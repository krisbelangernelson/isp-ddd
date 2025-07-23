import type { Request, Response, NextFunction } from 'express';
import { errorResponses } from '@/shared/httpErrors/errorResponses';
import { type Error } from '@/shared/httpErrors';
import tokenVerification from '@/shared/tokenVerification';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = String(req.headers.authorization).split('Bearer ')[1];

    const decodedToken = tokenVerification(token);

    if (decodedToken != null) {
      //@ts-expect-error add token to express Request obj
      req.token = decodedToken;
    }

    next();
  } catch (error) {
    errorResponses(res, error as Error, 'verifyToken');
  }
};
