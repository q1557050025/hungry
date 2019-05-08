import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: '31.22299,121.36025',
    address: {},
  },
  mutations: {
    saveGeohash(state, geohash) {
      state.geohash = geohash
    },
    saveAddress(state, address) {
      state.address = address
    },
  },
  actions: {

  }
})
