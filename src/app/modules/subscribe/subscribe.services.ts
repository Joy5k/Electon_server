import { IUserEmailSubscription } from './subscribe.interface';
import { Subscription } from './subscribe.model';

const createSubscriber = async (
  subscriber: IUserEmailSubscription
): Promise<IUserEmailSubscription> => {
  try {
    console.log('Payload before saving:', subscriber);
    const result = await Subscription.create(subscriber);
    console.log('Saved Document:', result);
    return result;
  } catch (error) {
    console.error('Error in creating subscriber:', error);
    throw new Error('Failed to create subscriber');
  }
};

export const subscribeServices = {
  createSubscriber,
};
