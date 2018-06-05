<template>
  <div
    id="e3"
    style="width: 80%; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey darken-3">
      <v-toolbar-title class="white--text">Our products</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="auth">
        <v-btn color="red darken-3" :to="{name: 'AddForm', params: {id: 'new'}}">Create new product</v-btn>
      </template>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-card-actions>
      </v-card-actions>
    </v-toolbar>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12 v-for="item in list" :key="item.id">
            <v-card color="blue-grey darken-1" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">{{ item.name }}</div>
                      <div>{{ item.description }}</div>
                      <div>{{ item.price }} $</div>
                      <v-card-actions>
                        <v-btn flat dark :to="{name: 'AddForm', params: {id: item.id}}">See more</v-btn>
                        <v-btn flat dark :to="{name: 'AddForm', params: {id: item.id}}">Edit product</v-btn>
                        <v-btn  dark :to="{name: 'AddForm', params: {id: item.id}}">Add to cart</v-btn>
                      </v-card-actions>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      :src=item.image
                      height="125px"
                      contain
                    ></v-card-media>
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
      page: 1
    }
  },

  computed: {
    ...mapState('products', {
      list: 'addsList'
    }),
    ...mapState({
      auth: 'isAuth'
    })
  },

  created () {
    this.$store.dispatch('products/index')
  }
}
</script>
