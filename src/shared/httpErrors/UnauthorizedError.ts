import BaseError from './BaseError';
import { unauthorizedError } from './errors';

class UnauthorizedError extends BaseError {
  constructor(message: string, code?: string | undefined) {
    super(
      code ?? unauthorizedError.code,
      unauthorizedError.reason,
      unauthorizedError.status,
      message,
    );
  }
}
export default UnauthorizedError;
