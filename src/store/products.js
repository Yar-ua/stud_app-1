import axios from 'axios'
import API from './api'

export default {
  namespaced: true,
  state: {
    addsList: [],
    addItem: {},
    user: {},
    token: {},
    isAuth: !!localStorage.isAuth,
    image: {},
    count: ''
  },

  mutations: {
    updateAddsList (state, data) {
      state.addsList = data.products
      state.count = data.count.value
    },
    updateAddItem (state, data) {
      state.addItem = data
      if (data.path == null) {
        state.addItem.imageUrl = null
      } else {
        state.addItem.imageUrl = process.env.apiUrl + '/uploads/' + data.path
      }
    }
  },

  actions: {
    setList (context, params) {
      context.commit('updateAddsList', params.data)
    },
    index (context, params) {
      return axios.get(API.productsSort(params), '')
        .then(response => {
          context.commit('updateAddsList', response.data)
        })
    },
    show (context, params) {
      if (params.id === 'new') {
        context.commit('updateAddItem', {id: '', name: '', description: '', price: '', image: ''})
      } else {
        return axios.get(API.product(params.id), '')
          .then(response => {
            let editedItem = {}
            Object.assign(editedItem, response.data)
            context.commit('updateAddItem', editedItem)
          })
      }
    },
    create (context, params) {
      return axios.post(API.products, params)
        .then(response => {
          context.commit('updateAddItem', response.data)
        })
    },
    update (context, params) {
      return axios.put(API.product(params.id), params)
    },
    delete (context, params) {
      return axios.delete(API.product(params.id), '')
    }
  }
}
