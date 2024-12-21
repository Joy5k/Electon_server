import { z } from 'zod';

const UserEmailSubscriptionSchema = z.object({
   body: z.object({
    email: z.string().email(),
    subscribedAt: z.string(),
    isActive: z.boolean(),
   }),
});

export const subscriptionValidationSchema = {
    UserEmailSubscriptionSchema,
};