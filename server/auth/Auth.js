const User = require('../model/user')

exports.register = async (req, res) => {
    const { username, password } = req.body
    if (password.length < 4) {
        return res.status(400).json({ message: 'Password less than 4 characters'})
    }
    try {
        await User.create({
            username, password, connected: true
        }).then(user =>
                res.status(200).json({
                message: 'User successfully created',
                user,
            })
        )
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: 'User not created',
            error: err.message
        })
    }
}

exports.login = async (req, res) => {
    const { username } = req.body
    if (!username) {
        return res.status(400).json({
            message: 'Username or Password not present',
        })
    }

    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(401).json({
                message: 'Login not successful',
                error: 'User not found',
            })
        } else {
            res.status(200).json({
                message: "Login Successful",
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

