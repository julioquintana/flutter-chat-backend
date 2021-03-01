/*
* path: api/messages
* */
const {getMessages} = require("../controller/messages");
const {validJWT} = require("../middlewares/valid-jwt");
const {Router} = require('express')

const routeMessages = Router();

routeMessages.get('/:from',
    validJWT,
    getMessages);

module.exports = {
    routeMessages
};
