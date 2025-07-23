import { ServiceRepository } from '../domain/service.repository';

export const findAllServices = (repo: ServiceRepository) => async () => {
  const services = await repo.findAll();
  return services;
};
