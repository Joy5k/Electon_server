import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import { sellsHistoryController } from "./sellsHistory.controller";
import validateRequest from "../../middlewares/validateRequest";
import { sellsHistoryValidationSchema } from "./sellsHistory.validation";



const router = express.Router();

router.post("/create-sold-history",
    auth(USER_ROLE.SELLER,USER_ROLE.USER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    validateRequest(sellsHistoryValidationSchema.createSellHistoryValidationSchema),
    sellsHistoryController.createSellHistory)
router.get("/get-all-sold-history",auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),sellsHistoryController.getAllSoldHistory)
router.delete("/delete-single-sold-history",auth(USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),sellsHistoryController.deleteSingSoldHistory)
export const sellsRoutes=router