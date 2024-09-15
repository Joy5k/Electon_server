import express from "express";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.get('/booking-list',bookingController.getAllMybookingList)
router.post('/booking',bookingController.postBooking)
router.delete('booking/:id',bookingController.deleteBooking)

export const bookingRoutes=router