/*
* path: api/users
* */
const {getUsers} = require("../controller/users");
const {validJWT} = require("../middlewares/valid-jwt");
const {Router} = require('express')

const routeUser = Router();

routeUser.get('/',
    [validJWT],
    getUsers);

module.exports = {
    routeUser
};
