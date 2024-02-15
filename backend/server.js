const express = require('express');
const app = express();

const http = require('http');

const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const socketsMap = new Map();

//const utilisateursRoutes = require('./routes/utilisateurs');
const arduinoRoutes = require('./routes/arduino');
const mobileRoutes = require('./routes/mobile');

//app.use('/utilisateurs', utilisateursRoutes);
app.use('/arduino', arduinoRoutes(io, socketsMap));
app.use('/mobile', mobileRoutes);

io.on('connection', (socket) => {
    console.log('Client connected');
    
    const socketId = socket.id;

    socketsMap.set(socketId, socket);

    socket.on('disconnect', () => {
        console.log('Client disconnected');

        socketsMap.delete(socketId);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

module.exports = socketsMap;