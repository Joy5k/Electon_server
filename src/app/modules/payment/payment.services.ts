import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import CustomError from "../../error/customError";
import { Products } from "../product/product.model";
import axios from "axios";
import { initPayment, validatePayment } from "../SSL/SSL.services";
import Stripe from "stripe";
const stripe = new Stripe(config.stripe_secret!); // Use your key here

const createPaymentIntent = async (payload: any, Token: any): Promise<any> => {
  // Create a Mongoose session for transaction handling
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;

    // Iterate through the payload and check product availability
    for (const item of payload) {
      const { productId, userSelectedQuantity } = item;

      // Fetch the product by ID with session
      const product = await Products.findById(productId).session(session);

      if (!product) {
        throw new CustomError(httpStatus.NOT_FOUND, `Product not found for ID: ${productId}`);
      }

      if (product.quantity < userSelectedQuantity) {
        throw new CustomError(
          httpStatus.BAD_REQUEST,
          `Insufficient quantity for product: ${product.title}. Available: ${product.quantity}, Requested: ${userSelectedQuantity}`
        );
      }

      // Deduct the purchased quantity from the product
      product.quantity -= userSelectedQuantity;
      await product.save({ session });

      // Calculate total amount
      totalAmount += product.price * userSelectedQuantity;
    }

    // Convert totalAmount to cents for Stripe
    const amountInCents = Math.round(totalAmount * 100);

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      paymentIntent,
      message: "Payment intent created and product quantities updated successfully.",
    };
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    throw new CustomError(
      httpStatus.SERVICE_UNAVAILABLE,
      error.message || "Something went wrong during payment processing."
    );
  }
};

const sslPaymentInit = async (payload: any) => {
  const res=await initPayment(payload)
  return res.GatewayPageURL
};

const validatedSSLPayment=async(payload:any)=>{
   if (!payload || !payload.status || !(payload.status === 'VALID')) {
        return {
            message: "Invalid Payment!"
        }
    }

    const response = await validatePayment(payload);

    if (response?.status !== 'VALID') {
        return {
            message: "Payment Failed!"
        }
    }

    // const response = payload;
   console.log(payload)

   const res=await axios({
    method:"POST",
  url:`${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
   })

   


   return {
    message: "Payment success!"
}

}






export const paymentServices = {
  createPaymentIntent,
  sslPaymentInit,
  
};
