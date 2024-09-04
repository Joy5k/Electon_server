import express from 'express';
import { productRoutes } from '../modules/product/product.routes';
import { userRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: productRoutes
    },
    {
        path: '/',
        route: userRoutes
    },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;