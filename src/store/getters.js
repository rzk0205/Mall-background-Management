const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menus: (state) => state.user.menus,
  ruleNames: (state) => state.user.ruleNames,
  isCollapse: (state) => state.menu.collapse,
  tags: (state) => state.tagsview.tags
}
export default getters
