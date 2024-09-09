import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/users',userController.getAllUsers)
router.get('/getMe',userController.getMe)
router.get('/login',userController.loginUserIntoDB)
router.get('/register',userController.registerUserIntoDB)

export const userRoutes=router