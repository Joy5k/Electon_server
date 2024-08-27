import express from 'express';
import { productRoutes } from '../modules/product/product.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: productRoutes
    },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;