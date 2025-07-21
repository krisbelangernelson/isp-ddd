import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class ServiceCategory {
  @PrimaryGeneratedColumn({ type: "smallint" })
  id: number;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  name: string;

  @OneToMany(() => Service, service => service.serviceCategory)
  services: Service[];
}