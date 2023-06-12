import { Product } from "src/products/entities/product.entity";

export interface ProductQuantity {
  product:Product,
  quantity:number
}

export interface ProductQuantityDto {
  product:string,
  quantity:number
}
