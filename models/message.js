const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
        to: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            require: true
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            require: true
        },
        message: {
            type: String,
            require: true
        },
    }
    , {
        timestamps: true
    }
    )
;

MessageSchema.method('toJSON', function () {
    const { _id, ...object} = this.toObject();
    return object
})
module.exports = model('Message', MessageSchema);
