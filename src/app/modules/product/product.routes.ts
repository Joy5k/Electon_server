import express, { NextFunction, Request, Response } from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.get('/products',  productController.getAllProducts)

router.get('/product/:id',  productController.getSingleProducts)

router.post('/product',productController.postProduct)

router.put('/product/:id',productController.updateProductIntoDB)

router.delete('/product/:id',productController)
export const productRoutes=router