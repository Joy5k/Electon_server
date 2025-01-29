// src/app/modules/chat.ts
import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Chat } from './chat.model';
import dotenv from 'dotenv';
dotenv.config(); 

function initializeSocketIO(server: HTTPServer) {
    // Initialize Socket.IO
    const io = new SocketIOServer(server, {
        cors: {
            origin: "*",
            methods: ['GET', 'POST', 'PUT','DELETE'],
            
            credentials: true,
        },
        transports: ['websocket', 'polling'], 

    });

    // Socket.IO connection handler
    io.on('connection', (socket) => {

        // Join a specific room
        socket.on('joinRoom', ({ email, room }) => {
            socket.join(room);

            // Notify other users in the room
            socket.to(room).emit('roomNotification', {
                message: `${email} has joined the room.`,
            });
        });

        socket.on('message', async ({ sender, room, text }) => {
            try {
        
                // Save the message to the database
                const messageData = { sender, room, text };
                const savedMessage = await Chat.create(messageData);
        
        
                // Broadcast the message to all users in the same room
                io.to(room).emit('message', {
                    sender,
                    room,
                    text,
                    timestamp: savedMessage.timestamp,
                });
            } catch (err) {
                console.error('Error saving message:', err);
            }
        });
        
        socket.on('fetchHistory', async ({ room }) => {
            try {
                // Fetch chat history from the database for the specified room
                const chatHistory = await Chat.find({ room }).sort({ timestamp: 1 });
                // Send the history back to the client
                socket.emit('chatHistory', chatHistory);
            } catch (err) {
                console.error('Error fetching chat history:', err);
            }
        });
         
        // Handle client disconnection
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
        });
    });

    return io;
}

export default initializeSocketIO;
