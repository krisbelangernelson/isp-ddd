// import type { CreateOrder } from '@/types/order'
// import type { OrderModel } from '@/models/pg'

import type { CreateOrderBody } from "../domain/order"
import type { OrderRepository } from "../domain/order.repository"

export const createOrder = (repo: OrderRepository) => async (body: CreateOrderBody) => {
  const order = await repo.save(body)
  return order
}
