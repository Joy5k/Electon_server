
import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import validateRequest from "../../middlewares/validateRequest";
import { chatController } from "./chat.controller";

const router = express.Router();

router.get('/chatting-rooms', 
    auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN), chatController.getAllRooms )


export const chattingRoutes=router