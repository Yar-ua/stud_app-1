<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg8>
      <v-card>
        <v-form ref="form">
          <v-toolbar color="grey darken-3">
            <v-toolbar-title class="white--text">Product info</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
            <v-flex justify-start xs6>
              <p>Product:</p>
              <p>Prod. name: {{ item.name }}</p>
              <p>Price: {{ item.price }} $</p>
              <p>Description: {{ item.description }}</p>
            </v-flex>
            <v-flex>
            <p>Seller:</p>
              <p>Name: {{ item.user_login }}</p>
              <p>Phone: {{ item.user_phone }}</p>
              <p>Email: {{ item.user_email }}</p>
            </v-flex>
              <template v-if="item.imageUrl != null">
                <img v-bind:src="item.imageUrl">
              </template>
              <template v-else>
                <img src="https://www.freeiconspng.com/uploads/no-image-icon-11.PNG" height="150px" alt="Icon No Free Png"/>
              </template>
            </v-layout>
          </v-container>

          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn :to="{name: 'AddsList'}">BACK</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
            </v-slide-x-reverse-transition>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddItem',
  computed: {
    ...mapState('products', {
      item: 'addItem'
    })
  },

  created () {
    this.$store.dispatch('products/show', {id: this.$route.params.id})
  }
}
</script>
