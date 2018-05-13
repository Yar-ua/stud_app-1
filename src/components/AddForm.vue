<!--<template>
  <div class="form" lighten>
    <h1>Create or update product page: </h1>
    <h3>Add Id: {{ $route.params.id }}</h3>
    <input v-model="item.name"/>
    <br /><br />
    <button @click="save()">Save</button>
     &nbsp;&nbsp;
    <router-link :to="{name: 'AddsList'}">Cancel</router-link>
  </div>
</template>-->

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
                  v-model="name"
                  box
                  label="Product Name"
                  :rules="nameRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="price"
                  box
                  label="Product Price, $"
                  :rules="priceRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field box
                  v-model="description"
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
            <v-btn
            color="primary"
            :disabled="!valid"
            @click="save"
            >
              SAVE PRODUCT
            </v-btn>
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
      v => (v && v.length <= 30) || 'Product Description must be less than 1000 characters'
    ],
    price: '',
    priceRules: [
      v => !!v || 'Price is required',
      v => (v && v.length <= 30) || 'Price must be less than 20 digits',
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
      /* this.$store.dispatch('save', {item: this.item})
        .then(() => {
          this.$router.push({name: 'AddsList'})
        }) */
      console.log(this.name, this.description, this.price)
    }
  },
  created () {
    this.$store.dispatch('loadById', {id: this.$route.params.id})
  }
}
</script>
