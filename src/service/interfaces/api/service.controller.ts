import type { Request, Response } from 'express'
import * as internetServices from '@/service/application/service.service'
import { errorResponses } from '@/shared/httpErrors/errorResponses'
import type { Error } from '@/shared/httpErrors'
import { makeServiceRepository } from '@/service/infrastructure/typeorm/typeorm-service.repository'
// import { pgModel } from '@/models/pg'

// const getAllServices = internetServices.findAllInternetServices(pgModel)

const repo = makeServiceRepository()
const findAllServices = internetServices.findAllServices(repo)

const getInternetServices = async (_req: Request, res: Response): Promise<void> => {
  await findAllServices()
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'getInternetServices'))
}

export { getInternetServices }
