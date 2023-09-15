<template>
    <router-view></router-view>
</template>

<script>
import SocketioService from './service/socketio.service'

export default {
  name: 'App',
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.welcome-txt {
  font-size: 16px;
  color: rgb(64, 184, 64);
}
</style>
