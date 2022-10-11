import {ProductEntity} from "../entity/product.entity";

export class ProductService{
    getAll(): Array<ProductEntity>{
        return ProductEntity.getAll()
    }
}