import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'
import products from './products'

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
  modules: {
    products
  },
  mutations: {
    updateAuth (state, data) {
      localStorage.isAuth = data
      state.isAuth = data
    },
    updateUser (state, data) {
      localStorage.user = data
      state.user = data
      console.log(localStorage)
    },
    updateToken (state, data) {
      localStorage.token = data
      state.token = data
    }
  },

  actions: {
    login (context, params) {
      return axios.post(API.login, params)
        .then(response => {
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
          context.commit('updateUser', '')
          context.commit('updateToken', '')
          context.commit('updateAuth', false)
          localStorage.clear()
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
