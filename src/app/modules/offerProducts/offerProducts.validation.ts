import { z } from "zod";

const offerProductValidationSchema=z.object({
    body:z.object({
        productId:z.string(),
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
const updateOfferProductValidationSchema=z.object({
    body:z.object({
        productId:z.string().optional(),
        offerPrice:z.number().optional(),
        offerStartDate:z.string().optional(),
        offerEndDate:z.string().optional(),
        offerDescription:z.string().optional(),
        offerImage:z.string().optional(),
        offerStatus:z.boolean().optional(),
        offerPercentage:z.number().optional(),
        offerQuantity:z.number().optional(),
        offerType:z.string().optional()

    })
})
export const offerValidation={
    updateOfferProductValidationSchema,
    offerProductValidationSchema
}