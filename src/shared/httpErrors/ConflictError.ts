import BaseError from './BaseError';
import { conflictError } from './errors';

class ConflictError extends BaseError {
  constructor(
    param: string | undefined,
    value: string | undefined,
    code?: string | undefined,
    message?: string | undefined,
  ) {
    super(
      code ?? conflictError.code,
      conflictError.reason,
      conflictError.status,
      message ?? `${param} [${value}] already exists.`,
    );
  }
}
export default ConflictError;
