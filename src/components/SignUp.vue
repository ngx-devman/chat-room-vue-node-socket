<template>
    <div
    class="q-mx-auto q-my-auto"
    style="max-width: 300px;"
  >
    <h4>Sign Up</h4>
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
    </q-input>
    <br>
    <q-input
      outlined
      v-model="password"
      type="password"
      label="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <span v-if="validationMsg.length > 0" class="text-left text-subtitle">
      {{ validationMsg }}
    </span>
    <br>
    <q-btn color="secondary" label="Sign Up" @click="signup" />
    <br><br>
    <span class="text-left text-subtitle">
      Already have an account ?
      <router-link to="/">Log In</router-link>
      here!
    </span>
  </div>
  </template>
  
  <script>

  export default {
    name: 'SignUp',
    data: () => ({
      username: '',
      password: '',
      validationMsg: ''
    }),
    methods: {
      async signup() {
        if (!this.username || !this.password) {
          this.validationMsg = 'Username or Password required'
        } else {
          const res = await this.$store.dispatch('userSignUp', { username: this.username, password: this.password })
          if (res.message === 'User successfully created') {
            this.$router.push('/chat')
          }
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  