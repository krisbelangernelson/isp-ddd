import type { CustomerBody, CustomerType } from "./customer";

export type CustomerRepository = {
  findById: (id: number) => Promise<CustomerType | null>;
  findByEmail: (email: string) => Promise<CustomerType | null>;
  findByPhone: (phone: string) => Promise<CustomerType | null>;
  save: (customer: CustomerBody) => Promise<CustomerType | null>;
};