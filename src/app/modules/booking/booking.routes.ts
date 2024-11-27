import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../shared/type";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = express.Router();

router.get('/booking-list', 
    auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),  
  bookingController.getAllMybookingList)

router.post('/create-booking',
    auth(USER_ROLE.USER,USER_ROLE.SELLER,USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),  
    validateRequest(bookingValidation.createBookingValidationSchema),
    bookingController.postBooking)

router.delete('/booking/:id',
    
    bookingController.deleteBooking)

export const bookingRoutes=router