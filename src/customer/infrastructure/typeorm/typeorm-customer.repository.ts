import { AppDataSource } from '@/infrastructure/database/typeorm/data-source';
import type { CustomerType } from '@/customer/domain/customer';
import type { CustomerRepository } from '@/customer/domain/customer.repository';
import { Customer } from './customer.entity';

export const makeCustomerRepository = (): CustomerRepository => {
  const repo = AppDataSource.getRepository(Customer);

  const toDomain = (entity: Customer): CustomerType => ({
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    phone: entity.phone,
    password: entity.password,
    createDate: entity.createDate,
    updateDate: entity.updateDate,
  });

  return {
    findById: async (id) => {
      const entity = await repo.findOneBy({ id });
      return entity ? toDomain(entity) : null;
    },
    findByEmail: async (email) => {
      const entity = await repo.findOneBy({ email });
      return entity ? toDomain(entity) : null;
    },
    findByPhone: async (phone) => {
      const entity = await repo.findOneBy({ phone });
      return entity ? toDomain(entity) : null;
    },
    save: async (customer) => {
      const entity = repo.create({ ...customer, id: 0 });
      await repo.save(entity);
      return entity ? toDomain(entity) : null;
    },
  };
};
