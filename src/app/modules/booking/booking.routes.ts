import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.get('/booking-list',bookingController.getAllMybookingList)

export const bookingRoutes=router