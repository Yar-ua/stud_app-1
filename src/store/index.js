import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import API from './api'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    addsList: [
      {
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
      }
    ],
    addItem: {},
    user: {},
    token: {},
    isAuth: !!localStorage.isAuth
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
    save (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.item.id) {
          item.name = params.item.name
        }
      })
      context.commit('updateAddsList', context.state.addsList)
    },
    login (context, params) {
      return axios.post(API.login, params, {withCredentials: false})
        .then(response => {
          context.commit('updateUser', JSON.parse(response.data)['login'])
          context.commit('updateToken', JSON.parse(response.data)['token'])
          context.commit('updateAuth', true)
        })
    },
    register (context, params) {
      return axios.post(API.register, params, {withCredentials: false})
        .then(response => {
          context.commit('updateUser', JSON.parse(response.data)['login'])
          context.commit('updateToken', JSON.parse(response.data)['token'])
          context.commit('updateAuth', true)
        })
    },
    logout (context) {
      return axios.get(API.logout, '', {withCredentials: false})
        .then(response => {
          localStorage.clear()
          console.log(response.data)
          context.commit('updateUser', '')
          context.commit('updateToken', '')
          context.commit('updateAuth', false)
        })
    },
    getProducts (context) {
      return axios.get(API.products, '', {withCredentials: false})
        .then(response => {
          context.commit('updateAddsList', response.data)
          console.log('token: ' + localStorage.token + ', user ' + localStorage.user + ' ' + localStorage.isAuth)
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
