import InternalError from './InternalError'
import ConflictError from './ConflictError'
import UnauthorizedError from './UnauthorizedError'
import ForbiddenError from './ForbiddenError'
import BadRequestError from './BadRequestError'
import NotFoundError from './NotFoundError'

export interface Error {
  code: string
  message: string
  reason: string
  stack?: string
  status?: number
  internalError?: Error
}

export { InternalError }
export { ConflictError }
export { UnauthorizedError }
export { ForbiddenError }
export { BadRequestError }
export { NotFoundError }
