import config from "../../config";


const stripe = require('stripe')(config.stripe_secret)
const createPaymentIntent=async(payload:any,Token:any):Promise<void>=>{

    const price = payload.amount;
    const amountInCents = Math.round(price * 100);

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