const {oneOf} = require("express-validator");
const {check} = require("express-validator");


const nameValidator = () =>
    check('name', 'el nombre es obligarotio').not().isEmpty();

const emailEmptyValidator = () => {
    return check('email', 'el email es obligarotio').not().isEmpty();
}
const emailValidValidator = () => {
    return check('email', 'el email no es valido').isEmail();
}


const passwordValidator = () => {
    return check('password', 'el password es obligatorio').not().isEmpty();
}


module.exports = {
    nameValidator,
    emailEmptyValidator,
    emailValidValidator,
    passwordValidator
};
