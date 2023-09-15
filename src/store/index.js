import axios from 'axios'
import { createStore } from 'vuex'

const devApiUrl = process.env.VUE_APP_SOCKET_ENDPOINT

const store =  createStore({
    state: {
        message: [],
        user: {},
        connectedUsers: []
    },
    getters: {
        userInfo: state => state.user,
        connectedUserList: state => state.connectedUsers
    },
    mutations: {
        setRegisteredUser: (state, user) => (
            state.user = user
        ),
        getRegisteredUser: (state, user) => (
            state.user = user
        ),
        getConnectedUserList: (state, users) => (
            state.connectedUsers = users
        ),
        updateMessage: (state, msg) => (
            state.message.push(msg)
        )
    },
    
    actions: {
        async userSignUp({ commit }, credentials) {
            try {
                const res = await axios.post(`${devApiUrl}/api/auth/register`, credentials)
                commit('setRegisteredUser', res.data.user)
                return res.data
            } catch (err) {
                return err.message
            }
        },

        async userLogin({ commit }, username) {
            try {
                const res = await axios.post(`${devApiUrl}/api/auth/login`, username)
                commit('getRegisteredUser', res.data.user)
                return res.data
            } catch (err) {
                return err.message
            }
        },
        async connectedUsers({ commit }) {
            try {
                const res = await axios.get(`${devApiUrl}/api/connected-users`)
                commit('getConnectedUserList', res.data)
                return res.data
            } catch (err) {
                return err.message
            }
        },
        
        updatedMessage({ commit }, message) {
            commit('updateMessage', message)
        }
    }
})

export default store