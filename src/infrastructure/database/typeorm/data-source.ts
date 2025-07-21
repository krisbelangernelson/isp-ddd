import "reflect-metadata"
import { DataSource } from "typeorm"
import { ConnectionType } from "../../../service/infrastructure/typeorm/connectionType.entity"
import { OrderState } from "../../../order/infrastructure/typeorm/orderState.entity"
import { Customer } from "../../../customer/infrastructure/typeorm/customer.entity"
import { Order } from "../../../order/infrastructure/typeorm/order.entity"
import { Service } from "../../../service/infrastructure/typeorm/service.entity"
import { ServiceCategory } from "../../../service/infrastructure/typeorm/serviceCategory.entity"
// import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "isp_admin",
    password: "password",
    database: "typeorm_isp",
    synchronize: true,
    logging: false,
    entities: [ConnectionType, Customer, Order, Service, OrderState, ServiceCategory],
    // entities: [User],
    migrations: [],
    subscribers: [],
})
