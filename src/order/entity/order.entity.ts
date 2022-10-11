import {ProductEntity} from "../../product/entity/product.entity";


export class OrderEntity{
    id: string;
    detail: string;
    product: ProductEntity[];

    static getAll(){
        return [{
            id: 1,
            detail: 'detail',
            product: ProductEntity.getAll()
        }]
    }
}

