import { setItem, getItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    tags: getItem('tags') || [{ title: '主控台', path: '/' }]
  },
  mutations: {
    setTagsview(state, obj) {
      const tagsFind = state.tags.find((item) => {
        return obj.path === item.path
      })
      if (!tagsFind) {
        state.tags.push(obj)
        setItem('tags', state.tags)
      }
    },
    removeTags(state, tagsView) {
      setItem('tags', tagsView)
    }
  },
  actions: {}
}
