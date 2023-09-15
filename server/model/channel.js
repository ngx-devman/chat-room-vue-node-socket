const Mongoose = require('mongoose')
const ChannelSchema = new Mongoose.Schema({
    channelName: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    connected: {
        type: Boolean,
        required: true
    }
})

const Channel = Mongoose.model('channel', ChannelSchema)

module.exports = Channel