// src/app/modules/chat.ts
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Chat } from './chat.model';

function initializeSocketIO(server: HTTPServer) {
    // Initialize Socket.IO
    const io = new SocketIOServer(server, {
        cors: {
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT'],
            credentials: true,
        },
    });

    // Socket.IO connection handler
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Join a specific room
        socket.on('joinRoom', ({ username, room }) => {
            socket.join(room);
            console.log(`--------------${username} joined room: ${room}-----------------------`);

            // Notify other users in the room
            socket.to(room).emit('roomNotification', {
                message: `${username} has joined the room.`,
            });
        });

        // Listen for messages from clients
        socket.on('message', async ({ username, room, text }) => {
            console.log(`Received message from ${username} in room ${room}:`, text);

            // Save the message to the database
            const messageData = { username, room, text };
            const res = await Chat.create(messageData);
            console.log(res, "This is response after saving message in database");

            // Broadcast the message to all users in the same room
            io.to(room).emit('message', messageData);
        });

        // Handle client disconnection
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
        });
    });

    return io;
}

export default initializeSocketIO;
