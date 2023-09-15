<template>
  <q-page>
    <q-header class="glossy">
      <q-toolbar>
        <q-toolbar-title v-if="roomUsers.receivername">
          {{ roomUsers.receivername }}'s chat room
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'ChatRoom',
  props: {
    receivedMsg: {
      type: Array,
      required: true,
    },
    sentMsg: {
      type: Array,
      required: true,
    },
    roomUsers: {
      type: Object,
      required: true
    },
    computed: {
      chatHistory() {
        const length = (Object.keys(this.receivedMsg)).length + (Object.keys(this.sentMsg)).length
        return length
      }
    }
  },
}
</script>
