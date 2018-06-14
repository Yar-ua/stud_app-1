<template>
  <v-layout justify-center>
    <v-flex xs10 sm10 md10 lg10>
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
              <template v-if="item.imageUrl != null">
                <img v-bind:src="item.imageUrl">
              </template>
              <template v-else>
                <img src="https://www.freeiconspng.com/uploads/no-image-icon-11.PNG" height="150px" alt="Icon No Free Png"/>
              </template>

              <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-text-field label="Select Image" @click='pickFile' v-model='imagefile' prepend-icon='attach_file'></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  :imagefile="imagefile"
                  @change="onFilePicked"
                  >
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
  data: () => {
    return {
      dialog: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 255) || 'Product Name must be less than 255 characters'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 5000) || 'Product Description must be less than 5000 characters'
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
    }
  },
  computed: {
    ...mapState('products', {
      item: 'addItem'
    })
  },
  methods: {
    save: function () {
      var params = {
        formData: {
          name: this.item.name,
          description: this.item.description,
          price: this.item.price
        },
        image: {
          filename: this.imageName,
          body: this.imageUrl
        }
      }
      this.$store.dispatch('products/create', params)
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
      var params = {
        id: this.item.id,
        formData: {
          name: this.item.name,
          description: this.item.description,
          price: this.item.price
        },
        image: {
          filename: this.imageName,
          body: this.imageUrl
        }
      }
      this.$store.dispatch('products/update', params)
        .then(() => {
          this.$router.push({name: 'AddItem', params: {id: this.item.id, preview: 'preview'}})
        })
    },
    destroy: function () {
      this.$store.dispatch('products/delete', {id: this.item.id})
        .then(() => {
          this.$router.push({name: 'AddsList'})
        })
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  },

  created () {
    this.$store.dispatch('products/show', {id: this.$route.params.id})
  }
}
</script>
