<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar color="grey darken-3">
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Login..."
              :rules="loginRules"
              v-model="login"
              hint="Enter your login!"
              persistent-hint
            ></v-text-field>
            <v-text-field
            name="input-10-1"
            label="Enter your password"
            hint="At least 6 characters"
            persistent-hint
            v-model="password"
            min="6"
            :rules="passwordRules"
            :append-icon="watchpass ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (watchpass = !watchpass)"
            :type="watchpass ? 'password' : 'text'"
            counter
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn href="/">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
            </v-slide-x-reverse-transition>
            <v-btn
            color="primary"
            :disabled="!valid"
            @click="loginAction"
            >
              LOGIN
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    login: '',
    loginRules: [
      v => !!v || 'Login is required',
      v => (v && v.length <= 30) || 'Login must be less than 50 characters'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Password must be less than 30 characters',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    watchpass: true,
    valid: true,
    hasError: false
  }),
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    loginAction: function () {
      this.$store.dispatch('login', {login: this.login, password: this.password})
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'AddsList'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    }
  },
  created () {
    if (this.isAuth || localStorage.isAuth) {
      this.$router.push({name: 'Page404'})
    }
  }
}
</script>
