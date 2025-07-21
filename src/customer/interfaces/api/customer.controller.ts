import type { Request, Response } from 'express'
import { type Error } from '@/shared/httpErrors'
import * as customerService from '@/customer/application/customer.service';
import { makeCustomerRepository } from '@/customer/infrastructure/typeorm/typeorm-customer.repository';
import { CustomerBody, CustomerExists, Login } from '@/customer/domain/customer';
import { errorResponses } from '@/shared/httpErrors/errorResponses';
import tokenVerification from '@/shared/tokenVerification';
// import { pgModel } from '@/models/pg'

const repo = makeCustomerRepository()
const registerCustomerService = customerService.registerCustomer(repo)
const loginCustomerService = customerService.loginCustomer(repo)
const customerExistsService = customerService.customerExists(repo)
const customerAreaService = customerService.customerArea(repo)

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  await registerCustomerService(req.body as CustomerBody)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'registerCustomer'))
}

export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  await loginCustomerService(req.body as Login)
    .then((results) => {
      res
        .status(200)
        .json(results)
    })
    .catch((error: Error) => errorResponses(res, error, 'loginCustomer'))
}

export const autoLoginCheck = (req: Request, res: Response): void => {
  const encodedToken = String(req.headers.authorization).split('Bearer ')[1]

  if (encodedToken !== undefined) {
    const decodedToken = tokenVerification(encodedToken)

    res.json({
      ...decodedToken,
      accessToken: encodedToken
    })
  } else {
    res.status(204).json({})
  }
}

export const customerExists = async (req: Request, res: Response): Promise<void> => {
  await customerExistsService(req.body as CustomerExists)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'customerExists'))
}

export const customerArea = async (req: Request, res: Response): Promise<void> => {
  // @ts-expect-error
  await customerAreaService(req.token)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'customerArea'))
}
