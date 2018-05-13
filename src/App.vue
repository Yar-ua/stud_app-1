<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <br />
        <v-list-tile @click="drawer">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="drawer">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img id="logo" src="../src/assets/logo.png" alt="Smiley face">
      <v-toolbar-title>YarMarket</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'AddsList'}">Market Menu</v-btn>
        <v-btn flat>
          My Cart
          <v-badge right>
            <span slot="badge">0</span>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <template v-if="!isAuth">
          <v-btn flat :to="{name: 'Login'}">Login</v-btn>
          <v-btn flat :to="{name: 'Register'}">Register</v-btn>
        </template>
        <v-btn flat @click="logoutAction">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; Yar-ua 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  },
  computed: {
    ...mapState(['isAuth'])
  },
  methods: {
    logoutAction: function () {
      this.$store.dispatch('logout', '')
        .then(() => {
          this.$router.push({name: 'AddsList'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    }
  }
}
</script>
