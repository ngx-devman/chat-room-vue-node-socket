<template>
  <div
    class="q-mx-auto q-my-auto"
    style="max-width: 300px;"
  >
    <h4>Sign In</h4>
    <br>
    <q-input
      outlined
      v-model="username"
      type="text"
      label="Username"
    >
      <template v-slot:prepend>
        <q-icon name="person" />
      </template>
      <template v-slot:append>
        <q-btn flat style="color: #FF0080;" :color="[username.length > 1 ? 'secondary': '']" @click="login" label="Submit" :disable="disabled"/>
      </template>
    </q-input>
    <br>
    <span class="text-left text-subtitle">
      Don't have an account ?
      <router-link to="/signup">Sign Up</router-link>
      here!
    </span>
  </div>
</template>

<script>

export default {
  name: 'LogIn',
  data: () => ({
    username: '',
    disabled: true,
    userInfo: {}
  }),
  watch: {
    username: function(newUser) {
      if(newUser.length > 0) {
        this.disabled = false;
      }
    }
  },
  created() {
  },
  methods: {
    async login() {

      localStorage.setItem('userId', this.username)
      const res = await this.$store.dispatch('userLogin', { username: this.username })
      if (res.message === 'Login Successful') {
        this.$router.push('/chat')
      }
    }
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
