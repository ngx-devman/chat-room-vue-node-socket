const User = require('../model/user')

exports.getUserList = async (req, res) => {
    try {
        const user = await User.find({ connected: true })
        if (!user) {
            res.status(401).json({
                message: 'No connected User found',
                error: 'User not found',
            })
        } else {
            res.status(200).json({
                message: "These users are available now",
                user
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'An error occurred',
            error: error.message
        })
    }
}

