// src/server.ts
import { Server as HTTPServer } from 'http';
import config from './app/config';
import app from './app';
import mongoose from 'mongoose';
import seedSuperAdmin from './app/DB';
import initializeSocketIO from './app/modules/chat';
import dotenv from 'dotenv';
import Stripe from 'stripe';
dotenv.config(); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.database_url as string);

        // Seed Super Admin (if needed)
        await seedSuperAdmin();

        // Create HTTP server instance
        const server: HTTPServer = new HTTPServer(app);

        // Initialize Socket.IO with the existing server
        initializeSocketIO(server);

        // Start server
        const port = config.port || 5000;
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        // Graceful shutdown handlers
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.info('Server closed!');
                });
            }
            process.exit(1);
        };

        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error);
            exitHandler();
        });

        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection:', error);
            exitHandler();
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

main();
