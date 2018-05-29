<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg8>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar color="grey darken-3">
            <v-toolbar-title class="white--text">Create or update product</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="item.name"
                  box
                  label="Product Name"
                  :rules="nameRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="item.price"
                  box
                  label="Product Price, $"
                  :rules="priceRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field box
                  v-model="item.description"
                  multi-line
                  label="Product's Description"
                  :rules="descriptionRules"
                  ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn :to="{name: 'AddsList'}">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
            </v-slide-x-reverse-transition>
            <template v-if="this.$route.params.id == 'new'">
              <v-btn
              color="primary"
              :disabled="!valid"
              @click="save"
              >
              SAVE PRODUCT
              </v-btn>
            </template>
            <template v-if="this.$route.params.id !== 'new'">
              <v-btn
              color="primary"
              :disabled="!valid"
              @click="update"
              >
              UPDATE PRODUCT
              </v-btn>
              <v-btn
              color="error"
              :disabled="!valid"
              @click="destroy"
              >
              DELETE PRODUCT
              </v-btn>
            </template>
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
    hasError: false
  }),
  computed: {
    ...mapState({
      item: 'addItem'
    })
  },
  methods: {
    save: function () {
      var params = {formData: {name: this.item.name, description: this.item.description, price: this.item.price}}
      this.$store.dispatch('createProduct', params)
        .then(() => {
          this.hasError = false
          this.$router.push({name: 'AddsList'})
        }).catch(err => {
          if (err.response.status !== 200) {
            this.hasError = true
          }
        })
    },
    update: function () {
      var params = {id: this.item.id, formData: {name: this.item.name, description: this.item.description, price: this.item.price}}
      this.$store.dispatch('updateProduct', params)
        .then(() => {
          this.$router.push({name: 'AddsList'})
        })
    },
    destroy: function () {
      this.$store.dispatch('deleteProduct', {id: this.item.id})
        .then(() => {
          this.$router.push({name: 'AddsList'})
        })
    }
  },
  created () {
    if (this.$route.params.id !== 'new') {
      this.$store.dispatch('loadById', {id: this.$route.params.id})
    } else {
      this.$store.dispatch('resetAddItem')
    }
  }
}
</script>
