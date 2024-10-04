import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";

const router = express.Router();

router.get('/all-users',auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),userController.getAllUsers)
router.get('/getMe',userController.getMe)
router.put('/block/:id',
    auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    userController.blockUser
)
router.delete('/delete/:id',
    auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),userController.deleteUser)

export const userRoutes=router;