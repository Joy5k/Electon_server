

import { Types } from "mongoose";
import { Schema, z } from "zod";

const userId = z.custom((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });
const productId = z.custom((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });
  
const createBookingValidationSchema=z.object({
    userId,
    productId,
    quantity:z.number().min(1)
})

export const bookingValidation={
    createBookingValidationSchema
}