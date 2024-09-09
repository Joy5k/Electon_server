import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/users',userController.getAllUsers)
router.get('/user/getMe',userController.getMe)
router.get('/user/login',userController.loginUserIntoDB)
router.get('/user/register',userController.registerUserIntoDB)
export const userRoutes=router