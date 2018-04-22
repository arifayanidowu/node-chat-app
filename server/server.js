const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat room'));

    socket.broadcast.emit("newMessage", generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log(`New Message`, message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`server started on port ${port}`);
});