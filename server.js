const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
const { register, login } = require('./server/auth/Auth')
const { getUserList } = require('./server/auth/userStatus')
const { updateChatHistory } = require('./server/auth/chat')

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:8080']
    }
})
const connectDB = require('./server/db')
connectDB()

const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(router)

router.route('/api/auth/register').post(register)
router.route('/api/auth/login').post(login)
router.route('/api/connected-users').get(getUserList)

app.get('/', (req, res) => {
    res.send('Hey, Socket.io')
})
const users ={}
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    
    socket.on('createRoom', (roomname) => {
        users[socket.id] = roomname
        socket.join(roomname)
    }),
    socket.on('send-message', async (data) => {
        await updateChatHistory(data)
        socket.broadcast.emit('send-message', data.msg)
    })
})

const server = http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

process.on('unhandleRejection', err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})

module.exports = app