import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import { paymentController } from "./payment.controller";


const router = express.Router();

router.post("/create-payment-intent",auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),paymentController.createPayment  )
router.post("/ssl-payment-intent",auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),paymentController.createSSLPaymentInit  )

export const paymentRoutes=router