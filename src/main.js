import { createApp } from 'vue'
import router from './router/index'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/index'

createApp(App)
.use(Quasar, quasarUserOptions)
.use(router)
.use(Vuex)
.use(store)
.mount('#app');
