import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/users',userController.getAllUsers)
router.get('/user/getMe',userController.getMe)
export const userRoutes=router