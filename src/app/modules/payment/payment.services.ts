
const stripe = require("stripe")(process.env.STRIP_KEY);

const createPaymentIntent=async(payload:any,Token:any):Promise<void>=>{

    const booking = payload;
    const price = booking.price;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: amount,
        "payment_method_types": [
            "card"
        ]
    })

console.log(paymentIntent,payload,Token)
}



 export const paymentServices={
    createPaymentIntent
}