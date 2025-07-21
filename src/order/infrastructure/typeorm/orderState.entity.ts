import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderState {
  @PrimaryGeneratedColumn({ type: "smallint" })
  id: number;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  name: string;

  @OneToMany(() => Order, order => order.orderState)
  orders: Order[];
}