import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../shared/type';
import { offerProductController } from './offerProducts.controller';
import validateRequest from '../../middlewares/validateRequest';
import { offerValidation } from './offerProducts.validation';

const router=express.Router();

router.post('/create',
    auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    validateRequest(offerValidation.offerProductValidationSchema) ,
    offerProductController.createOfferProduct)
    
router.get('/allOffers',offerProductController.getGeneralOfferProductFromDB)
router.get('/dealOfTheDayOffer',offerProductController.getDealOfTheDayOfferProductFromDB)
router.put('/update/:id',
    auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),
    validateRequest(offerValidation.updateOfferProductValidationSchema),
    offerProductController.updateOfferProduct)
router.delete('/delete/:id',auth(USER_ROLE.ADMIN,USER_ROLE.SUPER_ADMIN),offerProductController.deleteOfferProduct)

export const offerProductRoutes=router;