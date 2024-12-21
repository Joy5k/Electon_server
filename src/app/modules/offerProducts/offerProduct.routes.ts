import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../shared/type';
import { offerProductController } from './offerProducts.controller';

const router=express.Router();

router.post('/create',auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),offerProductController.createOfferProduct)


export const offerProductRoutes=router;