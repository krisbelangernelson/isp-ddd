import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ConnectionType } from "./connectionType.entity";
import { ServiceCategory } from "./serviceCategory.entity";
import { Order } from "../../../order/infrastructure/typeorm/order.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn({ type: "smallint" })
  id: number;

  @Column({ type: "varchar", length: 40, unique: true, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  label: string;

  @Column({ type: "varchar", length: 80, nullable: true })
  description: string;

  @Column({ type: "smallint", nullable: true })
  serviceCategoryId: number;

  @Column({ type: "smallint", nullable: true })
  connectionTypeId: number;

  @Column({ type: "smallint", nullable: true })
  bandwidthDown: number;

  @Column({ type: "smallint", nullable: true })
  bandwidthUp: number;

  @Column({ type: "smallint" })
  price: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  idealNumUsers: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  idealNumDevices: string;

  @ManyToOne(() => ConnectionType, connectionType => connectionType.services)
  connectionType: ConnectionType;

  @ManyToOne(() => ServiceCategory, category => category.services)
  serviceCategory: ServiceCategory;

  @OneToMany(() => Order, order => order.service)
  orders: Order[];
}