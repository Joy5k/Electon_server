import { Router } from 'express';
import { subscribeController } from './subscribe.controller';
import validateRequest from '../../middlewares/validateRequest';
import { subscriptionValidationSchema } from './subscribe.validation';

const router = Router();

// Route to handle new email subscription
router.post('/subscribe',validateRequest(subscriptionValidationSchema.UserEmailSubscriptionSchema), subscribeController.createUserSubscription);

// // Route to handle unsubscription
// router.post('/unsubscribe', subscribeController.unsubscribe);

// // Route to get all subscriptions
// router.get('/subscriptions', subscribeController.getAllSubscriptions);

export const subscribeRoutes= router;