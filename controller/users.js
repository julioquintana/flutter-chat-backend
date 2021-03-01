const {response} = require('express')
const User = require("../models/usuario");

const getUsers = async (req, res = response) => {
    const limit = 20
    const from = Number(req.query.page) || 0;

    const users = await User
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(limit * from)
        .limit(limit)
    return res.status(200).json({
        ok: true,
        users
    });
}

module.exports = {
    getUsers
}
