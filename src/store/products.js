import axios from 'axios'

import API from './api'

export default {
  actions: {
    getProducts (context) {
      return axios.get(API.products, '')
        .then(response => {
          context.commit('updateAddsList', response.data)
        })
    },
    createProduct (context, params) {
      return axios.post(API.products, params)
        .then(response => {
          context.commit('updateAddItem', response.data)
        })
    },
    updateProduct (context, params) {
      return axios.put(API.product(params.id), params)
        .then(response => {
          if (response.data === true) {
            /* TODO make successful alert */
          }
        })
    },
    deleteProduct (context, params) {
      return axios.delete(API.product(params.id), '')
        .then(response => {
          if (response.data === true) {
            /* TODO make successful alert */
          }
        })
    }
  }
}
