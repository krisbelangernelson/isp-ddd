import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Order } from "@/order/infrastructure/typeorm/order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  firstName: string;

  @Column({ type: "varchar", length: 40 })
  lastName: string;

  @Column({ type: "varchar", length: 40, unique: true })
  email: string;

  @Column({ type: "varchar", length: 10, unique: true })
  phone: string;

  @Column({ type: "text" })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updateDate: Date;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}