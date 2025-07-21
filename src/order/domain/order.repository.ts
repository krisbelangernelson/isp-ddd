import type { CreateOrderBody, OrderType } from "./order";

export type OrderRepository = {
  findById: (id: number) => Promise<OrderType | null>;
  save: (order: CreateOrderBody) => Promise<OrderType | null>;
};