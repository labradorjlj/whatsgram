const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Gerenciamento de conexões do Chat
io.on('connection', (socket) => {
    console.log('Um usuário se conectou: ' + socket.id);

    // Quando o usuário envia uma mensagem
    socket.on('chat message', (data) => {
        // Envia a mensagem para todo mundo conectado
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectou');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
