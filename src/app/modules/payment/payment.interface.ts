export interface  ISSLPaymentData {
    store_id: string | undefined;
    store_passwd: string | undefined;
    total_amount: any;
    currency: string;
    tran_id: any;
    success_url: string | undefined;
    fail_url: string | undefined;
    cancel_url: string | undefined;
    ipn_url: string;
    shipping_method: string;
    product_profile: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_add2: string;
    cus_city: string;
    cus_state: string;
    cus_postcode: string;
    cus_country: string;
    cus_phone: string;
    cus_fax: string;
    ship_name: string;
    ship_add1: string;
    ship_add2: string;
    ship_city: string;
    ship_state: string;
    ship_postcode: number;
    ship_country: string;
    [key: string]: any; // Allow dynamic keys (e.g., product_name_1, product_category_1)
  }