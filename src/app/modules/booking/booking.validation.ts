import { Types } from "mongoose";
import { z } from "zod";

// Custom ObjectId validation using zod refinement
const objectIdValidation = z.string().refine((val) => Types.ObjectId.isValid(val), {
    
  message: "Invalid ObjectId",
});
// Booking validation schema
const createBookingValidationSchema = z.object({
  body:z.object({
    productId: objectIdValidation,      // Validate that productId is a valid ObjectId
  quantity: z.number().min(1).optional() // Optional quantity, with a minimum of 1
  })
});

// Export the validation schema
export const bookingValidation = {
  createBookingValidationSchema
};
