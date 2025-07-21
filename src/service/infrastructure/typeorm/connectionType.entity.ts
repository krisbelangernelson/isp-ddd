import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class ConnectionType {
  @PrimaryGeneratedColumn({ type: "smallint" })
  id: number;

  @Column({ type: "varchar", length: 20, unique: true, nullable: true })
  name: string;

  @OneToMany(() => Service, service => service.connectionType)
  services: Service[];
}