const User = require('../model/user')

exports.updateChatHistory = async (req) => {
    let res = {}
    const { channel_id, msg, userId } = req
    console.log(channel_id)
    try {
        const user = await User.findById(userId)
        if (!user) {
            res = {
                message: 'No connected User found',
                error: 'User not found',
            }
            return res
        } else {
            res = {
                message: "These users are available now",
                user
            }
            return res
        }
    } catch (error) {
        res = {
            message: 'An error occurred',
            error: error.message
        }
        return res
    }
}

