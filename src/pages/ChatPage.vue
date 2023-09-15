<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="glossy">
        <q-btn
          flat
          color="dark"
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class=""
        />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item clickable>
          <q-btn round push>
              <q-avatar size="55px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
              </q-avatar>
              <q-badge class="on-right" floating color="green" rounded />
              
              <q-popup-proxy>
                  <q-banner>
                      <template v-slot:avatar>
                          <q-avatar size="55px">
                              <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                          </q-avatar>
                      </template>
                      <p>{{ adminData.username }}</p>
                      <small>{{ adminData._id }}</small>
                      <br>
                      <span v-if="adminData.active">
                      <q-badge class="q-mr-md" color="green" rounded />
                        Active
                      </span>
                  </q-banner>
                  <q-separator/>
                  <q-btn flat icon="logout" label="Sign Out" @click="logOut"/>
              </q-popup-proxy>
          </q-btn>
          <q-item-section>
            <span class="q-ml-md text-h5 text-left">{{ adminData.username }}</span>
          </q-item-section>
        </q-item>

        <q-separator />
        <q-tabs
          vertical
          active-color="dark"
          active-bg-color="info"
          dense
        >
          <q-tab clickable v-for="user in connectedUsers"
            :key="user._id"
            @click="goToChatRoom(user)"
          >
            <q-btn round >
                <q-avatar size="45px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <q-badge class="on-right" floating color="green" rounded />
            </q-btn>
              <span class="q-ml-md text-h6 text-left">{{ user.username }}</span>
          </q-tab>
        </q-tabs>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page v-if="!receiverMsg && !senderMsg">
        <p class="text-h1">&#129489;</p>
        <span class="text-h5">Hello, there. send messages to your connectors</span>
      </q-page>
      <div class="row q-px-md q-py-md">
      <div style="width: 100%">
        <q-chat-message
          v-if="receiverMsg.length > 0"
          :name="chatRoomUsers.receivername"
          :avatar="chatRoomUsers.receiverAvatar"
          :text="receiverMsg"
        />
        <q-chat-message
          v-if="senderMsg.length > 0"
          :name="chatRoomUsers.sendername"
          :avatar="chatRoomUsers.senderAvatar"
          :text="senderMsg"
          sent
        />
      </div>
    </div>
    </q-page-container>
    <q-footer class="bg-teal-7 text-primary">
          <q-input rounded outlined v-model="message" bg-color="white" class="q-px-md q-py-sm" @keydown.enter="sendMessage">
              <template v-slot:prepend>
                  <q-btn
                      round
                      icon="sentiment_satisfied"
                  />
              </template>
              <template v-slot:append>
                  <q-btn
                      round
                      icon="send"
                      style="color: #FF0080;"
                      :disable="sendDisabled"
                      @click="sendMessage"
                  />
              </template>
          </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import socketioService from '@/service/socketio.service'

export default {
  name: 'LayoutDefault',

  data: () => ({
    adminData: {},
    connectedUsers: [],
    chatRoomUsers: {},
    senderMsg: [],
    receiverMsg: [],
    message: '',
    connectedUserId: '',
    channelId: '',
    chatroomSelected: false
  }),
  setup () {
    return {
      leftDrawerOpen: ref(false),
      showUserInfo: ref(false),
      sendDisabled: ref(true),
    }
  },

  async beforeMount() {
    this.adminData = await this.$store.getters.userInfo
    const userList = await this.$store.dispatch('connectedUsers')
    this.connectedUsers = userList.user.filter(user => user.username !== this.adminData.username)
  },
  watch: {
    message: function(newMsg) {
      if(newMsg.length > 0) {
        this.sendDisabled = false;
      }
    }
  },

  methods: {
    goToChatRoom(user) {
      this.channelId = `${user.username}`
      // this.receiverMsg = user.chat.sentMsg
      socketioService.createUniqueChatRoom(this.channelId)
      this.chatRoomUsers = {
        sendername: this.adminData.username,
        receivername: user.username,
        receiverAvatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        senderAvatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      }
    },
    async sendMessage() {
      if (this.message.length > 0) {
        this.senderMsg.push(this.message)
        socketioService.sendMessagesToUsers(this.channelId, this.message, this.adminData._id)
        const { messages } = socketioService
        this.receiverMsg.push(messages)
        this.message = ''
      }
    },
    logOut() {
      this.$router.push('/');
    }
  }
}
</script>