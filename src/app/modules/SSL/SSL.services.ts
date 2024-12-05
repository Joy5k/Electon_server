import httpStatus from "http-status";
import CustomError from "../../error/customError";
import axios from "axios";
import { ISSLPaymentData } from "../payment/payment.interface";
import config from "../../config";

export const initPayment=async(payload:any)=>{
    const { successURL, failURL, cancelURL, sslPaymentApi, storeId, storePass } = config.ssl;

    try {
        // Prepare SSL payment data
        const data: ISSLPaymentData = {
          store_id: storeId,
          store_passwd: storePass,
          total_amount: 0, // We will calculate total amount based on the products
          currency: 'BDT', // Assuming currency is BDT for SSL
          tran_id: payload[0]._id, // Unique transaction ID (using product's unique ID)
          success_url: successURL,
          fail_url: failURL,
          cancel_url: cancelURL,
          ipn_url: "http://localhost:5000", // IPN URL
          shipping_method: 'Courier', // Define shipping method
          product_profile: 'general', // Product profile for SSL Commerce
          cus_name: payload[0].userId.firstName + ' ' + payload[0].userId.lastName,
          cus_email: payload[0].userId.email,
          cus_add1: 'Dhaka', // Use dynamic address if available
          cus_add2: 'Dhaka',
          cus_city: 'Dhaka',
          cus_state: 'Dhaka',
          cus_postcode: '1000',
          cus_country: 'Bangladesh',
          cus_phone: payload[0].userId.phoneNumber,
          cus_fax: '01711111111', // You can adjust based on actual data
          ship_name: payload[0].userId.firstName + ' ' + payload[0].userId.lastName,
          ship_add1: 'Dhaka', // You can adjust based on actual shipping data
          ship_add2: 'Dhaka',
          ship_city: 'Dhaka',
          ship_state: 'Dhaka',
          ship_postcode: 1000,
          ship_country: 'Bangladesh',
        };
    
        // Initialize total_amount to 0
        let totalAmount = 0;
    
        // Add multiple products to the SSL data and calculate total amount
        payload.forEach((item: any, index: number) => {
          const product = item.productId;
    
          // Add product details to SSL payment data
          data[`product_name_${index + 1}`] = product.title;
          data[`product_category_${index + 1}`] = product.product_category || 'General'; // Assuming a general category if not available
          data[`product_quantity_${index + 1}`] = item.userSelectedQuantity;
          data[`product_price_${index + 1}`] = product.price;
    
          // Calculate the total amount
          totalAmount += product.price * item.userSelectedQuantity;
        });
    
        // Update total amount in SSL payment data
        data.total_amount = totalAmount;
    
        // Send payment data to SSL API for payment gateway initialization
        const response = await axios({
          method: "POST",
          url: sslPaymentApi,
          data: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    
        return response.data;
    
      } catch (error: any) {
        throw new CustomError(httpStatus.SERVICE_UNAVAILABLE, error.message || "Something went wrong during the payment process.");
      }
}