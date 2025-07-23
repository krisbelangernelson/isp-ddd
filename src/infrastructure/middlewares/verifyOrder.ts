import type { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '@/shared/httpErrors';
import { errorResponses } from '@/shared/httpErrors/errorResponses';
import type { Error } from '@/shared/httpErrors';
import type { CreateOrderBody } from '@/order/domain/order';

export const verifyOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const {
      offerId,
      line1,
      city,
      state,
      postal_code: postalCode,
      customerId,
    } = req.body as CreateOrderBody;

    if (offerId === undefined) {
      throw new BadRequestError('offerId', offerId);
    } else if (line1 === undefined) {
      throw new BadRequestError('line1', line1);
    } else if (city === undefined) {
      throw new BadRequestError('city', city);
    } else if (state === undefined) {
      throw new BadRequestError('state', state);
    } else if (postalCode === undefined) {
      throw new BadRequestError('postalCode', postalCode);
    } else if (customerId === undefined) {
      throw new BadRequestError('customerId', String(customerId));
    } else {
      next();
    }
  } catch (error) {
    errorResponses(res, error as Error, 'verifyOrder');
  }
};
