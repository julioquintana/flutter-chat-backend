const {response} = require('express')
const Message = require("../models/message");

const getMessages = async (req, res = response) => {

    const miId = req.uid;
    const idFrom = req.params.from;

    const lastMessage = await Message.find({
        $or: [{from: miId, to: idFrom}, {from: idFrom, to: miId}]
    }).sort({createdAt: 'desc'})
        .limit(30);

    return res.status(200).json({
        ok: true,
        messages: lastMessage
    });
}

module.exports = {
    getMessages
}
