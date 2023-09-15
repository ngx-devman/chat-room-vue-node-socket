import { io } from 'socket.io-client';

class SocketioService {
    socket;
    messages;
    constructor() {}
    setupSocketConnection() {
        this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
        this.socket.onAny((evt, ...args) => {
            console.log(evt, ...args)
        })
    }
    createUniqueChatRoom(channelId) {
      this.socket.emit('createRoom', channelId)

    }
    sendMessagesToUsers(channelId, msg, id) {
        this.socket.emit('send-message', {channelId, msg, id})
        this.socket.on('send-message', (msg) => {
            this.messages = msg
        })
    }
    getUserList() {
        this.socket.on('userList', (users) => {
            users.forEach((user) => {
                console.log(user)
            })
        })
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
export default new SocketioService();

