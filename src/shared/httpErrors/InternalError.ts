import BaseError from './BaseError'
import { internalError } from './errors'

class InternalError extends BaseError {
  internalError: object | string | undefined

  constructor(error: Error | undefined, code = internalError.code, message = internalError.msg) {
    super(code, internalError.reason, internalError.status, message)
    this.internalError = error
  }
}

export default InternalError
