import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'
import products from './products'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    user: {
      id: localStorage.id ? localStorage.id : '',
      user: localStorage.user ? localStorage.user : '',
      token: localStorage.token ? localStorage.token : ''
    },
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
      localStorage.id = data.id
      localStorage.user = data.login
      localStorage.token = data.token
      state.user = {
        id: data.id,
        user: data.login,
        token: data.token
      }
    }
  },

  actions: {
    login (context, params) {
      return axios.post(API.login, params)
        .then(response => {
          context.commit('updateUser', response.data)
          context.commit('updateAuth', true)
        })
    },
    register (context, params) {
      return axios.post(API.register, params)
        .then(response => {
          context.commit('updateUser', response.data)
          context.commit('updateAuth', true)
        })
    },
    logout (context) {
      return axios.get(API.logout, '')
        .then(response => {
          context.commit('updateUser', {id: '', login: '', token: ''})
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

export default Store
