const {saveMessage} = require("../controller/socket");
const {userDisconnected} = require("../controller/socket");
const {userConnected} = require("../controller/socket");
const {validJWTSocket} = require("../helpers/jwt");
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {

    const [valid , uid] = validJWTSocket(client.handshake.headers["x-token"]);
    console.log('Cliente conectado');
    console.log(valid, uid)

    if(!valid) client.disconnect();

    userConnected(uid);

    client.join(uid);

    client.on('message-personal', async (payload)=>{
       await saveMessage(payload);
        io.to(payload.to).emit('message-personal', payload);
    })

    console.log('Cliente autenticado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnected(uid);
    });

});
