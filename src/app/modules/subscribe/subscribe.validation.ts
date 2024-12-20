import { z } from 'zod';

const UserEmailSubscriptionSchema = z.object({
   body: z.object({
    email: z.string().email(),
    isActive: z.boolean(),
   }),
});

export const subscriptionValidationSchema = {
    UserEmailSubscriptionSchema,
};