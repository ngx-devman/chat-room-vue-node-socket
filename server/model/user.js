const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    connected: {
        type: Boolean,
        required: true
    },
    chat: {
        sentMsg: []
    }
})

const User = Mongoose.model('user', UserSchema)

module.exports = User