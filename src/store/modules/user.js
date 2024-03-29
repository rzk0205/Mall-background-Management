import loginApi from '../../api/user'
import { getItem, setItem, removeItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    menus: '',
    ruleNames: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', state.token)
    },
    setUserInfo(state, userInfo) {
      // const { menus, ruleNames } = userInfo
      state.menus = userInfo.menus
      state.userInfo = userInfo
      state.ruleNames = userInfo.ruleNames
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const res = await loginApi.login(loginForm)
      commit('setToken', res.data.token)
      return res
    },
    async getUserInfo({ commit }) {
      const userInfo = await loginApi.getUserInfo()
      // console.log(menu)
      commit('setUserInfo', userInfo.data)
      return userInfo
    },
    // 退出登录
    async logout({ commit }) {
      const res = await loginApi.logout()
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem('token')
      removeItem('tags')
      console.log(res)
      return res
    }
  }
}
