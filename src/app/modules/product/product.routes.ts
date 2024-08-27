import express, { NextFunction, Request, Response } from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.get('/products',  productController.getAllProducts)

export const productRoutes=router