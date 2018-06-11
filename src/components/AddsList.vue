<template>
  <div id="AddsList" class="grey lighten-3">
    <v-toolbar color="grey darken-3">
      <v-toolbar-title class="white--text">Our products</v-toolbar-title>
      <v-spacer>
        name
        ||
        price
        ||
        date
        </v-spacer>
      <template v-if="auth">
        <v-btn color="red darken-3" :to="{name: 'AddForm', params: {id: 'new'}}">Create new product</v-btn>
      </template>
      <v-card-actions>
      </v-card-actions>
    </v-toolbar>
    <v-card>
      <v-container id="addsContainer"
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
                      <div class="headline">{{ item.name }}</div>
                      <div>{{ item.description }}</div>
                      <div>{{ item.price }} $</div>
                      <v-card-actions>
                        <template v-if="item.user_id != user.id">
                          <v-btn flat dark :to="{name: 'SingleAdd', params: {id: item.id}}">not seller</v-btn>
                        </template>
                        <template v-else>
                          <v-btn dark :to="{name: 'AddForm', params: {id: item.id}}">seller</v-btn>
                        </template>
                      </v-card-actions>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <template v-if="item.path != null">
                      <v-card-media
                        :src=imagePrefix+item.path
                        height="125px"
                        contain
                      ></v-card-media>
                    </template>
                    <template v-else>
                      <img src="https://www.freeiconspng.com/uploads/no-image-icon-11.PNG" height="150px" alt="Icon No Free Png" />
                    </template>
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
      msg: 'Welcome to ProductList',
      limit: 10,
      page: 1,
      imagePrefix: process.env.apiUrl + '/uploads/',
      type: '',
      sort: ''
    }
  },

  computed: {
    ...mapState('products', {
      list: 'addsList'
    }),
    ...mapState({
      auth: 'isAuth',
      user: 'user'
    })
  },

  created () {
    this.$store.dispatch('products/index')
  }
}
</script>
