<!-- <template>
  <div class="form">
    <h1>Editing add page: </h1>
    <h3>Add Id: {{ $route.params.id }}</h3>
    <input v-model="item.name"/><br/>
    <input v-model="item.description"/><br/>
    <input v-model="item.price"/><br/>
    <br /><br />
    <button @click="save()">Save</button>
     &nbsp;&nbsp;
    <router-link :to="{name: 'AddsList'}">Cancel</router-link>
  </div>
</template> -->

<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-toolbar color="grey darken-3">
        <v-toolbar-title class="white--text">Edit product</v-toolbar-title>
      </v-toolbar>
      <v-card ref="form">
        <v-card-text>
          <v-form v-model="valid" ref="form" class="grey darken-3" lazy-validation>
            <h3>Add Id: {{ $route.params.id }}</h3>
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
              @click="save"
              :disabled="!valid"
            >
              submit
            </v-btn>
            <v-btn :to="{name: 'AddsList'}">clear</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddForm',
  computed: {
    ...mapState({
      item: 'addItem'
    })
  },
  methods: {
    save: function () {
      this.$store.dispatch('save', {item: this.item})
        .then(() => {
          this.$router.push({name: 'AddsList'})
        })
    }
  },
  created () {
    this.$store.dispatch('loadById', {id: this.$route.params.id})
  },
  data: () => ({
    valid: true,
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
  })
}
</script>
