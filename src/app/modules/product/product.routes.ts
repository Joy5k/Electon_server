import express, { NextFunction, Request, Response } from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.get("/get-all-products",  productController.getAllProducts)

router.get('/single-product/:id',  productController.getSingleProducts)

router.post('/create-product',productController.postProduct)

router.put('/update-product/:id',productController.updateProductIntoDB)

router.delete('/delete-product/:id',productController.deleteProduct)

export const productRoutes=router