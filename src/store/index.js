import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    addsList: [
      {
        id: '1',
        name: 'stool',
        description: 'perfect wood stool with 4 legs',
        cost: '50',
        image: '/static/products/prod_1.jpg'
      },
      {
        id: '2',
        name: 'cavalery',
        description: 'wood horse on wheels, good for quick unpredictable moves',
        cost: '150',
        image: '/static/products/prod_2.jpg'
      },
      {
        id: '3',
        name: 'pepelac',
        description: 'old fashion aircraft for interplanetary flights',
        cost: '50000000',
        image: '/static/products/prod_3.jpg'
      },
      {
        id: '4',
        name: 'supercarrier "Gerald Ford"',
        description: 'look like big floating town, expensive toy for real men',
        cost: '3450000000',
        image: '/static/products/prod_4.jpg'
      }
    ],
    addItem: {}
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
    }
  }
})

export default Store
