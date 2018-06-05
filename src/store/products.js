import axios from 'axios'
import API from './api'

export default {
  namespaced: true,
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
    }
  },

  actions: {
    setList (context, params) {
      context.commit('updateAddsList', params.data)
    },
    resetAddItem (context) {
      context.commit('updateAddItem', {id: '', name: '', description: '', price: ''})
    },
    index (context) {
      return axios.get(API.products, '')
        .then(response => {
          context.commit('updateAddsList', response.data)
        })
    },
    show (context, params) {
      context.state.addsList.forEach(item => {
        if (item.id === params.id) {
          let editedItem = {}
          Object.assign(editedItem, item)
          context.commit('updateAddItem', editedItem)
        }
      })
    },
    create (context, params) {
      return axios.post(API.products, params)
        .then(response => {
          context.commit('updateAddItem', response.data)
        })
    },
    update (context, params) {
      return axios.put(API.product(params.id), params)
        .then(response => {
          if (response.data === true) {
            /* TODO make successful alert */
          }
        })
    },
    delete (context, params) {
      return axios.delete(API.product(params.id), '')
        .then(response => {
          if (response.data === true) {
            /* TODO make successful alert */
          }
        })
    }
  }
}
