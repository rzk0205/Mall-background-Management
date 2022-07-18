const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menus: (state) => state.user.menus,
  ruleNames: (state) => state.user.ruleNames
}
export default getters
