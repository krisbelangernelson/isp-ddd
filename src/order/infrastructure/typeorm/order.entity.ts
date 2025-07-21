import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { OrderState } from "./orderState.entity";
import { Customer } from "@/customer/infrastructure/typeorm/customer.entity";
import { Service } from "@/service/infrastructure/typeorm/service.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "smallint", nullable: true })
  serviceId: number;

  @Column({ type: "smallint", nullable: true })
  customerId: number;

  @Column({ type: "varchar", length: 30, nullable: true })
  serviceStreet: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  serviceCity: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  serviceProvince: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  servicePostalCode: string;

  @Column({ type: "smallint", default: 1 })
  state: number;

  @CreateDateColumn({ type: "timestamp" })
  orderDate: Date;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

  @ManyToOne(() => Service, service => service.orders)
  service: Service;

  @ManyToOne(() => OrderState, state => state.orders)
  orderState: OrderState;
}