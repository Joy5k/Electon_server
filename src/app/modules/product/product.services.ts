import { Products } from "./product.model"


const getProductsFromDB=async()=>{
    const result= await Products.find()
    return result
}

export const productServices={
    getProductsFromDB
}