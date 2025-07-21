import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";
import type { OrderType } from "@/order/domain/order";
import { OrderRepository } from "@/order/domain/order.repository";
import { Order } from "./order.entity";


export const makeOrderRepository = (): OrderRepository => {
  const repo = AppDataSource.getRepository(Order);

  const toDomain = (entity: Order): OrderType => ({
    id: entity.id,
    serviceId: entity.serviceId,
    customerId: entity.customerId,
    serviceStreet: entity.serviceStreet,
    serviceCity: entity.serviceCity,
    serviceProvince: entity.serviceProvince,
    servicePostalCode: entity.servicePostalCode,
    state: entity.state,
    orderDate: entity.orderDate.toISOString(),
  });

  return {
    findById: async (id) => {
      const entity = await repo.findOneBy({ id });
      return entity ? toDomain(entity) : null;
    },
    save: async (order) => {
      const entity = repo.create({ ...order, state: 2, servicePostalCode: order.postal_code, id: 0 });
      await repo.save(entity);
      return entity ? toDomain(entity) : null;
    }
  };
};