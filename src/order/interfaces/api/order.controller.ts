import type { Request, Response } from 'express'
import * as orderService from '@/order/application/order.service'
import { errorResponses } from '@/shared/httpErrors/errorResponses'
import { type Error } from '@/shared/httpErrors'
import { CreateOrderBody } from '@/order/domain/order'
import { makeOrderRepository } from '@/order/infrastructure/typeorm/typeorm-order.repository'
// import { pgModel } from '@/models/pg'

const repo = makeOrderRepository()
const createOrderService = orderService.createOrder(repo)

const createOrder = async (req: Request, res: Response): Promise<void> => {
  await createOrderService(req.body as CreateOrderBody)
    .then((results) => res.status(201).json(results))
    .catch((error: Error) => errorResponses(res, error, 'createOrder'))
}

export { createOrder }
