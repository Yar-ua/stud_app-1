<template>
  <div id="AddsList" class="grey lighten-3">
    <v-toolbar color="grey darken-3">
      <v-toolbar-title class="white--text">Our products</v-toolbar-title>
      <v-spacer>
        <v-flex xs12 sm6 class="py-2">
          <v-btn-toggle v-model="type" mandatory>
            <v-btn flat value="name" @click="sortItems">
              by name
              <template v-if="this.type === 'name'">
                <template v-if="this.sort === 'desc'">
                  <i class="material-icons">keyboard_arrow_up</i>
                </template>
                <template v-else>
                  <i class="material-icons">keyboard_arrow_down</i>
                </template>
              </template>
            </v-btn>
            <v-btn flat value="price" @click="sortItems">
              by price
              <template v-if="this.type === 'price'">
                <template v-if="this.sort === 'desc'">
                  <i class="material-icons">keyboard_arrow_up</i>
                </template>
                <template v-else>
                  <i class="material-icons">keyboard_arrow_down</i>
                </template>
              </template>
            </v-btn>
            <v-btn flat value="date" @click="sortItems">
              by date
              <template v-if="this.type === 'date'">
                <template v-if="this.sort === 'desc'">
                  <i class="material-icons">keyboard_arrow_up</i>
                </template>
                <template v-else>
                  <i class="material-icons">keyboard_arrow_down</i>
                </template>
              </template>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-spacer>
      <template v-if="auth">
        <v-btn color="red darken-3" :to="{name: 'AddForm', params: {id: 'new'}}">
          Create new product
        </v-btn>
      </template>
      <v-card-actions>
      </v-card-actions>
    </v-toolbar>
    <v-card>
      <v-container id="addsContainer"
        fluid
        grid-list-lg
      >
      <div class="text-xs-center">
        <v-pagination :length=pages v-model="page" @input="next"></v-pagination>
      </div>
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
                      <template v-if="user.role === 'admin'">
                        <v-btn dark color="teal darken-1" :to="{name: 'AddForm', params: {id: item.id}}">manage product</v-btn>
                      </template>
                      <template v-else>
                        <template v-if="item.user_id != user.id">
                          <v-btn flat outline dark :to="{name: 'SingleAdd', params: {id: item.id}}">product info</v-btn>
                        </template>
                        <template v-else>
                          <v-btn dark :to="{name: 'AddForm', params: {id: item.id}}">my product</v-btn>
                        </template>
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
      <template>
      <div class="text-xs-center">
        <v-pagination :length=pages v-model="page" @input="next"></v-pagination>
      </div>
      </template>
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
      imagePrefix: process.env.apiUrl + '/uploads/',
      page: 1,
      type: 'name',
      sort: 'asc'
    }
  },

  computed: {
    ...mapState('products', {
      list: 'addsList',
      count: 'count'
    }),
    ...mapState({
      auth: 'isAuth',
      user: 'user'
    }),
    pages: function () {
      return Math.ceil(this.count / 10)
    }
  },

  methods: {
    sortItems: function () {
      (this.sort === 'asc') ? (this.sort = 'desc') : (this.sort = 'asc')
      this.setUrl()
      this.sendRequest()
    },

    next: function () {
      this.setUrl()
      this.sendRequest()
    },

    setPage: function () {
      ((this.$route.query.page === undefined) || isNaN(this.$route.query.page)) ? (this.page = 1) : (this.page = parseInt(this.$route.query.page))
    },
    setType: function () {
      (this.$route.query.type === undefined) ? (this.type = 'name') : (this.name = (this.$route.query.type))
    },
    setSort: function () {
      (this.$route.query.sort === undefined) ? (this.sort = 'asc') : (this.sort = this.$route.query.sort)
    },

    setUrl: function () {
      this.$router.push(
        {name: 'AddsList', query: {page: this.page, type: this.type, sort: this.sort}}
      )
    },

    sendRequest: function () {
      var params = this.$route.fullPath
      this.$store.dispatch('products/index', params)
    }
  },

  created () {
    this.setPage()
    this.setType()
    this.setSort()
    this.setUrl()
    this.sendRequest()
  }
}
</script>
