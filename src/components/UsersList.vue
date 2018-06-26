<template v-if="user.role === 'admin'">
  <div id="UsersList" class="grey lighten-3">
    <v-toolbar color="grey darken-3">
      <v-toolbar-title class="white--text">Users List</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-card-actions>
      </v-card-actions>
    </v-toolbar>
    <v-card>
      <v-container id="usersContainer"
        fluid
        grid-list-lg
      >
      <v-layout row wrap>
        <v-flex xs12 v-for="item in list" :key="item.id">
          <v-card color="blue-grey darken-1" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex>
                  <div>
                    <div class="headline">{{ item.login }}</div>
                    <div>{{ item.phone }}</div>
                    <div>{{ item.email }} $</div>
                    <div>{{ item.role }} $</div>
                    <v-card-actions>
                      <template v-if="user.role === 'admin'">
                        <v-btn dark color="teal darken-1" :to="{name: 'EditUser', params: {id: item.id}}">edit user</v-btn>
                      </template>
                    </v-card-actions>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddsList',
  data () {
    return {
      msg: 'Welcome to EditUser'
    }
  },

  computed: {
    ...mapState('users', {
      list: 'usersList'
    }),
    ...mapState({
      auth: 'isAuth',
      user: 'user'
    })
  },

  methods: {},

  created () {
    this.$store.dispatch('users/index', '')
  }
}
</script>
