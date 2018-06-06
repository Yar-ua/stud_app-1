<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg8>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation enctype="multipart/form-data">
          <v-toolbar color="grey darken-3">
            <v-toolbar-title class="white--text">Create or update product</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <p>{{ item.name }}</p>
              </v-flex>
              <v-flex xs12 sm6>
                <p>{{ item.price }} $</p>
              </v-flex>
              <v-flex xs12>
                <p>{{ item.description }}</p>
              </v-flex>
              <template v-if="item.path != null">
                <img v-bind:src="currentImage">
              </template>
              <template v-else>
                <img src="https://www.freeiconspng.com/uploads/no-image-icon-11.PNG" height="150px" alt="Icon No Free Png"/>
              </template>
            </v-layout>
          </v-container>

          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn :to="{name: 'AddsList'}">Cancel</v-btn>
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
  name: 'AddForm',
  data: () => ({
    dialog: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Product Name must be less than 255 characters'
    ],
    description: '',
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length <= 1000) || 'Product Description must be less than 1000 characters'
    ],
    price: '',
    priceRules: [
      v => !!v || 'Price is required',
      v => (v && v.length <= 20) || 'Price must be less than 20 digits',
      v => /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/.test(v) || 'Price must be digit'
    ],
    valid: true,
    hasError: false,
    imageName: '',
    imageUrl: '',
    imagefile: ''
  }),
  computed: {
    ...mapState('products', {
      item: 'addItem'
    }),
    currentImage () {
      return process.env.apiUrl + '/uploads/' + this.item.path
    }
  }
}
</script>
