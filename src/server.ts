import { Server } from 'http';
import config from './app/config';
import app from './app'
import mongoose from 'mongoose';




async function main() {
  await mongoose.connect(config.database_url as string);

    const server: Server = app.listen(config.port, () => {
        console.log("Sever is running on port ", config.port);
    });

    // const exitHandler = () => {
    //     if (server) {
    //         server.close(() => {
    //             console.info("Server closed!")
    //         })
    //     }
    //     process.exit(1);
    // };
    // process.on('uncaughtException', (error) => {
    //     console.log(error);
    //     exitHandler();
    // });

    // process.on('unhandledRejection', (error) => {
    //     console.log(error);
    //     exitHandler();
    // })
};

main();