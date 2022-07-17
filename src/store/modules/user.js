import loginApi from '../../api/user'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', state.token)
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const res = await loginApi.login(loginForm)
      commit('setToken', res.token)
      return res
    }
  }
}
