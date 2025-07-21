import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";
import { ServiceRepository } from "@/service/domain/service.repository";
import { Service } from "./service.entity";
import { ServiceType } from "@/service/domain/service";


export const makeServiceRepository = (): ServiceRepository => {
  const repo = AppDataSource.getRepository(Service);

  const toDomain = (entities: Service[]): ServiceType[] => entities.map((entity) => ({
    id: entity.id,
    bandwidthDown: entity.bandwidthDown,
    bandwidthUp: entity.bandwidthUp,
    label: entity.label,
    name: entity.name,
    description: entity.description,
    price: entity.price,
    type: entity.connectionType.name,
    category: entity.serviceCategory.name,
    idealNumUsers: entity.idealNumUsers,
    idealNumDevices: entity.idealNumDevices,
  }));

  return {
    findAll: async () => {
      const entity = await repo.find({
        relations: {
          connectionType: true,
          serviceCategory: true,
        },
      });
      return entity ? toDomain(entity) : null;
    },
  };
};