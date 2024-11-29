import httpStatus from "http-status";
import config from "../../config";
import CustomError from "../../error/customError";
import mongoose from "mongoose";
const stripe = require('stripe')(config.stripe_secret)


const createPaymentIntent=async(payload:any,Token:any):Promise<void>=>{

    const price = payload.amount;
    const amountInCents = Math.round(price * 100);
try {
    const session=await mongoose.startSession()

} catch (error) {
    throw new CustomError(httpStatus.SERVICE_UNAVAILABLE,"something went wrong ")
}
    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: amountInCents,
        "payment_method_types": [
            "card"
        ]
    })
return paymentIntent
}



 export const paymentServices={
    createPaymentIntent
}