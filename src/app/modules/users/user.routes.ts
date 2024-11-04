import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.put('/create-admin',auth(USER_ROLE.SUPER_ADMIN),userController.createAdmin)

router.get('/all-users',auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),userController.getAllUsers)
router.put('/update',auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), 
validateRequest(userValidation.updateUserValidationSchema),
userController.updateMe)
router.get('/getMe',auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),  userController.getMe)

router.put('/block/:id', auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), userController.blockUser)

router.delete('/delete/:id', auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),userController.deleteUser)

export const userRoutes=router;