import {OrderEntity} from "../../order/entity/order.entity";

export class UsersEntity{
    id: number;
    name: string;
    surname: string;
    order: OrderEntity[] | null

    static getAll(){
        return [
            {
                id: 1,
                name: 'name',
                surname: 'surname',
                order: OrderEntity.getAll()
            },
            {
                id: 2,
                name: 'name',
                surname: 'surname',
                order: []
            }
        ]
    }
}