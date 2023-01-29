import { Product } from "./product";
import { User } from "./user";

export interface Order {
    UserId: User,
    Products: Array<Product>,
    Address:string,
    status:string
}
