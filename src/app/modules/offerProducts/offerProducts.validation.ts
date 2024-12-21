import { z } from "zod";

const offerProductValidationSchema=z.object({
    body:z.object({
        productId:z.string(),
        offerProvider:z.string(),
        offerPrice:z.number().optional(),
        offerStartDate:z.string(),
        offerEndDate:z.string(),
        offerDescription:z.string().optional(),
        offerImage:z.string().optional(),
        offerStatus:z.boolean(),
        offerPercentage:z.number().optional(),
        offerQuantity:z.number().optional(),
        offerType:z.string()

    })
})
export const offerValidation={
    offerProductValidationSchema
}