//facilita la declaración de paths
const path = require('path');
const express = require('express');
const app = express();
//settings --> se define un puerto libre o el port 3000 por defecto
app.set('port', process.env.PORT || 3000);
//static files --> se utiliza la carpeta public donde se alojan la vista y demas
app.use(express.static(path.join(__dirname, 'public')));
//start the server --> se inicializa el server en el puerto definido
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
//websockets 
const SocketIO = require('socket.io');
//se pasa un servidor activo a socket.io
const io = SocketIO(server);
// se usa on para resibir peticiones de clientes y respuestas
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    console.log('clientsCount', io.sockets.server.engine.clientsCount);
    // 
    if (io.sockets.server.engine.clientsCount >= 3) {
        socket.emit('chat:fin', 'false');
    }
    //se recepta la petición 'chat:message' emitida por un cliente
    socket.on('chat:message', (data) => {
        //se emite un evento a todos los clientes conectados
        io.sockets.emit('chat:message', data);
    });
    //se recepta la petición 'chat:typing' emitida por un cliente
    socket.on('chat:typing', (data) => {
        //se emite un evento a todos los clientes conectados ecepto al emisor de la acción
        socket.broadcast.emit('chat:typing', data);
        ///prueba 
    });
});





