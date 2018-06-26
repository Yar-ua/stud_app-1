<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar color="grey darken-3">
            <v-toolbar-title class="white--text">Edit User</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Login..."
              :rules="loginRules"
              v-model="addUser.login"
              hint="Enter your login!"
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="addUser.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              mask="+##(###)###-##-##"
              v-model="addUser.phone"
              :rules="phoneRules"
              label="Phone number"
              single-line
              required
            ></v-text-field>
            <v-text-field
              v-model="addUser.role"
              label="role: 'user' or 'admin'"
              required
            ></v-text-field>
            <!-- <v-text-field
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
            <v-text-field
              name="input-10-1"
              label="Retype your password"
              hint="At least 6 characters"
              persistent-hint
              v-model="repassword"
              min="6"
              :rules="passwordRules"
              :append-icon-cb="() => (watchpass = !watchpass)"
              :type="watchpass ? 'password' : 'text'"
              counter
            ></v-text-field> -->
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
              @click="updateAction"
              >
                UPDATE
            </v-btn>
            {{addUser}}
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddUser',
  data: () => ({
    login: '',
    loginRules: [
      v => !!v || 'Login is required',
      v => (v && v.length <= 30) || 'Login must be less than 30 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'],
    phone: '',
    phoneRules: [
      v => !!v || 'Phone is required',
      v => (v && v.length <= 12) || 'Phone No must be less than 12 digits',
      v => /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/.test(v) || 'Phone No must be digit'],
    // password: '',
    // passwordRules: [
    //   v => !!v || 'Name is required',
    //   v => (v && v.length <= 30) || 'Password must be less than 30 characters',
    //   v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    // ],
    // watchpass: true,
    valid: true,
    hasError: false,
    role: '',
    items: [
      { text: 'user' },
      { text: 'admin' }
    ]
  }),
  computed: {
    ...mapState('users', {
      addUser: 'addUser'
    }),
    ...mapState({
      auth: 'isAuth',
      user: 'user'
    })
  },

  methods: {
    updateAction: function () {
      var params = {
        id: this.addUser.id,
        formData: {
          login: this.addUser.login,
          email: this.addUser.email,
          phone: this.addUser.phone,
          role: this.addUser.role
        }
      }
      this.$store.dispatch('users/update', params)
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'UsersList'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    }
  },

  created () {
    this.$store.dispatch('users/show', {id: this.$route.params.id})
  }
}
</script>
