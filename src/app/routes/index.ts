import express from 'express';
import { productRoutes } from '../modules/product/product.routes';
import { userRoutes } from '../modules/users/user.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/product',
        route: productRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/user',
        route: userRoutes
    },
    {
        path:'/booking',
        route:bookingRoutes
    },
    {
        path:'/chat',
        route:bookingRoutes
    },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;