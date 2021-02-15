const {validationResult} = require("express-validator");


const validateAttribute = (req, res, next ) => {
    const errorsReq = validationResult(req);
    if (!errorsReq.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errorsReq.mapped()
        });
    }
    next();
}
module.exports = {validateAttribute};
