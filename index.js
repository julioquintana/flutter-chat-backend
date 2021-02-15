const express = require('express');
const path = require('path');
require('dotenv').config();
//db config
require('./config/database').dbConnection();
const {rutas} = require("./routes/auth");

// App de Express
const app = express();

//lectura y parseo de Body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// mis rutas
app.use('/api/login', rutas);

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


