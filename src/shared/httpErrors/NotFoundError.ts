import BaseError from './BaseError';
import { notFoundError } from './errors';

class NotFoundError extends BaseError {
  constructor(
    param: string | undefined,
    value: string | undefined,
    code?: string | undefined,
    message?: string,
  ) {
    super(
      code ?? notFoundError.code,
      notFoundError.reason,
      notFoundError.status,
      message ?? `${param} [${value}] not found.`,
    );
  }
}

export default NotFoundError;
