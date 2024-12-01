import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import validateRequest from "../../middlewares/validateRequest";



const router = express.Router();

router.post("/create-sells-history",auth(USER_ROLE.ADMIN,USER_ROLE.SELLER,USER_ROLE.SUPER_ADMIN),)