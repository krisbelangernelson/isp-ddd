// import type { ServiceModel } from "@/models/pg"

import { ServiceRepository } from "../domain/service.repository"

export const findAllServices = (repo: ServiceRepository) => async () => {
  const services = await repo.findAll()
  return services
}
