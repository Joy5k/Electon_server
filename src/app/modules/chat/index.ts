// src/app/modules/chat.ts
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

function initializeSocketIO(server: HTTPServer) {
    // Initialize Socket.IO
    const io = new SocketIOServer(server, {
        cors: {
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    // Socket.IO connection handler
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Listen for messages from clients
        socket.on('message', (data) => {
            console.log(`Received message from ${socket.id}:`, data);
            // Broadcast the message to all clients except the sender
            socket.broadcast.emit('message', data);
        });

        // Handle client disconnection
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
        });
    });

    return io;
}

export default initializeSocketIO;
