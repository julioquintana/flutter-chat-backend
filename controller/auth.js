const {response} = require('express')
const User = require("../models/usuario");
const bcrypt = require('bcryptjs')
const {generateJWT} = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const {email, password} = req.body;

    try{
        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            return  res.status(400).json({
                ok: false,
                errors: [{
                    'msg': 'No se puede registrar, ya existe este email'
                }]
            });
        }
    }catch (e) {
        return res.status(500).json({
            ok: false,
            errors: [{
                'msg': 'Error interno, informe al adminstrador'
            }]
        });
    }
    const user = new User(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    await user.save();

    const token = await generateJWT(user.id);

    res.json({
        ok: true,
        user,
        token
    })
}

const loginUser = async (req, res = response) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return  res.status(404).json({
                ok: false,
                errors: [{
                    'msg': 'Email no encontrado'
                }]
            });
        }
        const validPassword = bcrypt.compareSync(password,user.password );

        if(!validPassword){
            return  res.status(400).json({
                ok: false,
                errors: [{
                    'msg': 'Contraseña invalida'
                }]
            });
        }
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })


    }catch (e) {
        return res.status(500).json({
            ok: false,
            e,
            errors: [{
                'msg': 'Error interno, informe al adminstrador'
            }]
        });
    }
}

const renewToken = async (req, res = response) => {
    try {
        const {uid} = req;
        const token = await generateJWT(uid);
        const user = await User.findById(uid);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (e) {
        return res.status(500).json({
            ok: false,
            e,
            errors: [{
                'msg': 'Error interno, informe al adminstrador'
            }]
        });
    }
}

module.exports = {createUser,loginUser,renewToken};
