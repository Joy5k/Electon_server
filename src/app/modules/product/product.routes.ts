import express, { NextFunction, Request, Response } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import validateRequest from "../../middlewares/validateRequest";
import { productValidationSchema } from "./product.validation";

const router = express.Router();

router.get("/get-all-products",
    auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), 
     productController.getAllProducts
    )

router.get('/single-product/:id', 
    auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), 
     productController.getSingleProducts
    )

router.get('/my-products',
    auth(USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    productController.getAllMyProducts
)

router.post('/create-product',
    auth(USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    validateRequest(productValidationSchema.createProductValidationSchema),
     productController.postProduct
    )

router.put('/update-product/:id',
    auth(USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), 
    productController.updateProductIntoDB
)

router.delete('/delete-product/:id',
    auth(USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
     productController.deleteProduct
    )

export const productRoutes=router