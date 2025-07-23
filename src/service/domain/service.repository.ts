import { ServiceType } from './service';

export type ServiceRepository = {
  findAll: () => Promise<ServiceType[] | null>;
};
