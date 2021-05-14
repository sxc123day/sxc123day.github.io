import Vue from 'vue'
import Vuex from 'vuex'

// user
import user from '@/store/modules/user'
import { StateIndex } from '@/store/interface'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    ADD_LIST(state: StateIndex, value: any) {
      const obj = {
        value: value
      }
      state.list.push(obj)
    }
  },
  actions: {
    aaa(store, { aaaa }) {
      console.log(aaaa, 'aaaa')
    }
  },
  modules: {
    user
  },
  getters: {
    list: (state) => state.list
  }
})
