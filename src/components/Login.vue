<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            label="Email address..."
            :rules="emailRules"
            v-model="login"
            hint="Enter your email! We use email as login it this app"
            persistent-hint
          ></v-text-field>
          <v-text-field
          name="input-10-1"
          label="Enter your password"
          hint="At least 6 characters"
          persistent-hint
          v-model="password"
          min="6"
          :append-icon="watchpass ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (watchpass = !watchpass)"
          :type="watchpass ? 'password' : 'text'"
          counter
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="loginAction">LOGIN</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    watchpass: true,
    login: 'for@example.com',
    password: 'password',
    emailRules: [
      v => {
        return !!v || 'E-mail is required'
      },
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    loginAction () {
      console.log('Login: ' + this.login)
      console.log('Pass: ' + this.password)
    }
  },
  beforeCreate: function () {
    console.log('beforeCreate')
  }
}
</script>
