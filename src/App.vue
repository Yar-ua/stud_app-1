<template>
  <v-app id="app" dark>
    <app-header></app-header>
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
import Header from '@/components/Header'

export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  },
  components: {
    'app-header': Header
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
