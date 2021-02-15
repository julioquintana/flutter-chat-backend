/*
* path: api/login
* */
const {validJWT} = require("../middlewares/valid-jwt");
const {nameValidator, emailValidValidator,emailEmptyValidator , passwordValidator} = require("../validations/requestValidation");
const {Router} = require('express')
const {createUser, loginUser, renewToken} = require("../controller/auth");
const {validateAttribute} = require("../middlewares/validar-campos");

const rutas = Router();

rutas.post('/new', [
    nameValidator(),
    emailValidValidator(),
    emailEmptyValidator(),
    passwordValidator(),
    validateAttribute,
], createUser);

rutas.post('/', [
    emailValidValidator(),
    emailEmptyValidator(),
    passwordValidator(),
    validateAttribute
], loginUser);

rutas.get('/renew', validJWT,  renewToken);

module.exports = {
    rutas
};
