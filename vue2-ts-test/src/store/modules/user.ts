import { ADD_USER } from '@/store/vars/index'
import { StateUser } from '@/store/interface'

const user = {
  state: {
    userList: [],
  },
  mutations: {
    [ADD_USER](state: StateUser, value: string) {
      const obj = {
        value: value
      }
      state.userList.push(obj)
    },
  },
  actions: {
    getUserInfo({ dispatch }: any, aa: any) {
      dispatch('aaa', { aaaa: 1 }, { root: true })
    }
  },
}

export default {
  namespaced: true,
  ...user
}
