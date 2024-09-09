import express from 'express';
import { productRoutes } from '../modules/product/product.routes';
import { userRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/product',
        route: productRoutes
    },
    {
        path: '/auth',
        route: userRoutes
    },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;