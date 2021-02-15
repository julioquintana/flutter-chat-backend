const {response} = require('express')
const User = require("../models/usuario");
const bcrypt = require('bcryptjs')
const generateJWT = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const {email, password} = req.body;

    try{
        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            return  res.status(400).json({
                ok: false,
                body: 'No se puede registrar, ya existe este email'
            });
        }
    }catch (e) {
        return res.status(500).json({
            ok: false,
            body: 'Error interno, informe al adminstrador'
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
        const userDb = await User.findOne({email});
        if(!userDb){
            return  res.status(404).json({
                ok: false,
                body: 'Email no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync(password,userDb.password );

        if(!validPassword){
            return  res.status(400).json({
                ok: false,
                body: 'Contraseña invalida'
            });
        }
        const token = await generateJWT(userDb.id);

        res.json({
            ok: true,
            userDb,
            token
        })


    }catch (e) {
        return res.status(500).json({
            ok: false,
            e,
            body: 'Error interno, informe al adminstrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    try{
    const { uid } = req;
    const token = await generateJWT(uid);
    const userDb = await User.findById(uid);

        res.json({
            ok: true,
            userDb,
            token
        })

    }catch (e) {
        return res.status(500).json({
            ok: false,
            e,
            body: 'Error interno, informe al adminstrador'
        });
    }
}



module.exports = {createUser,loginUser,renewToken};
