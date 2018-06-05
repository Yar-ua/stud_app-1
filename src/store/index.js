import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'
import jsProducts from './products'

/* import Products from './products' */

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    addsList: [
      /* {
        id: '1',
        name: 'test1'
      },
      {
        id: '2',
        name: 'test2'
      },
      {
        id: '3',
        name: 'test3'
      } */
    ],
    addItem: {},
    smth: 'bayoboo',
    user: {},
    token: {},
    isAuth: !!localStorage.isAuth
  },
  components: {
    jsProducts
  },
  mutations: {
    updateAddsList (state, data) {
      state.addsList = data
    },
    updateAddItem (state, data) {
      state.addItem = data
    },
    updateAuth (state, data) {
      localStorage.isAuth = data
      state.isAuth = data
    },
    updateUser (state, data) {
      localStorage.user = data
      state.user = data
    },
    updateToken (state, data) {
      localStorage.token = data
      state.token = data
    }
  },

  actions: {
    setList (context, params) {
      context.commit('updateAddsList', params.data)
    },
    loadById (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.id) {
          let editedItem = {}
          Object.assign(editedItem, item)
          context.commit('updateAddItem', editedItem)
        }
      })
    },
    resetAddItem (context) {
      context.commit('updateAddItem', {id: '', name: '', description: '', price: ''})
    },
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
    },
    createImage (context, params) {
      return axios.post(API.images, params)
        .then(response => {
          /* context.commit('updateAddItem',
            {
              id: response.data.id,
              name: response.data.name,
              description: response.data.description,
              price: response.data.price
            }) */
        })
    },
    login (context, params) {
      return axios.post(API.login, params)
        .then(response => {
          console.log(response)
          context.commit('updateUser', response.data.login)
          context.commit('updateToken', response.data.token)
          context.commit('updateAuth', true)
        })
    },
    register (context, params) {
      console.log(params)
      return axios.post(API.register, params)
        .then(response => {
          context.commit('updateUser', response.data.login)
          context.commit('updateToken', response.data.token)
          context.commit('updateAuth', true)
        })
    },
    logout (context) {
      return axios.get(API.logout, '')
        .then(response => {
          localStorage.clear()
          context.commit('updateUser', '')
          context.commit('updateToken', '')
          context.commit('updateAuth', false)
        })
    }
  }
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.common['X-Auth'] = localStorage.token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default Store
