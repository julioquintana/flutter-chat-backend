const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        unique: true,
        require: true,
        type: String
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

UserSchema.method('toJSON', function () {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object
})
module.exports = model('User', UserSchema );
