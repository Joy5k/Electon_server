import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get('/users',userController.getAllUsers)

export const userRoutes=router