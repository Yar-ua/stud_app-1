<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-toolbar color="grey darken-3">
        <v-toolbar-title class="white--text">Create new product</v-toolbar-title>
      </v-toolbar>
      <v-card ref="form">
        <v-card-text>
          <v-form v-model="valid" ref="form" class="grey darken-3" lazy-validation>
            <v-text-field
              label="Id"
              v-model="item.id"
              :rules="idRules"
              :counter="10"
              hint="Enter your email! We use email as login it this app"
              required
            ></v-text-field>
            <v-text-field
              label="Name"
              v-model="item.name"
              :rules="nameRules"
              :counter="255"
              required
            ></v-text-field>
            <v-text-field
              name="input-7-3"
              label="Description"
              v-model="item.description"
              :rules="descriptionRules"
              :counter="1000"
              value="Write some description of product here..."
              multi-line
            ></v-text-field>
            <v-text-field
              label="Price"
              v-model="item.price"
              prefix="$"
              :rules="priceRules"
              :counter="25"
              required
            ></v-text-field>
            <v-btn
              @click="create"
              :disabled="!valid"
            >
              submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      item: 'addItem'
    })
  },
  data: () => ({
    valid: true,
    id: '',
    name: '',
    description: '',
    price: '',
    idRules: [
      v => !!v || 'Id is required',
      v => (v && v.length <= 10) || 'Id must be less than 10 characters',
      v => /^[0-9]*[.,]?[0-9]+$/.test(v) || 'Id must be digit'
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 255) || 'Name must be less than 255 characters'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length <= 1000) || 'Description must be less than 1000 characters'
    ],
    priceRules: [
      v => !!v || 'Price is required',
      v => (v && v.length <= 25) || 'Price must be less than 25 characters',
      v => /^[0-9]*[.,]?[0-9]+$/.test(v) || 'price must be digit'
    ]
  }),

  methods: {
    clear () {
      /* this.$refs.form.reset() */
    },
    create () {
      var item = this.item
      console.log(item.id)
      console.log(item.name)
      console.log(item.description)
      /* this.$store.dispatch('save', {item: this.item})
        .then(() => {
          this.$router.push({name: 'AddsList'})
        }) */
    }
  },
  created () {
    this.$store.dispatch('loadById', 1)
  }
}
</script>
