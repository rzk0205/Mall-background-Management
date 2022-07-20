<template>
  <div class="tabs">
    <div>
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-change="changeTab"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          :closable="item.path != '/'"
          v-for="item in tags"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const activeTab = ref(route.path)
// 监听路由的变化
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    if (route.meta && route.meta.title && route.path) {
      const obj = {
        title: route.meta.title,
        path: route.path
      }
      store.commit('tagsview/setTagsview', obj)
    }
  },
  { immediate: true, deep: true }
)
const tags = computed(() => {
  return store.getters.tags
})
// 点击tagsview跳转
const changeTab = (path) => {
  activeTab.value = path
  router.push(path)
}
// 点击路由跳转tagsview并更新
onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
})
const removeTab = (path) => {
  console.log(path)
  const tagsView = store.getters.tags
  // const tabs = tagsView
  // console.log(tabs)
  let activeName = activeTab.value
  if (activeName === path) {
    tagsView.forEach((tab, index) => {
      if (tab.path === path) {
        const nextTab = tagsView[index + 1] || tagsView[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeName
  const findItemIndex = tagsView.findIndex((tab) => tab.path === path)
  tagsView.splice(findItemIndex, 1)
  // tagsView = findtagsView.findIndex((tab) => tab.path !== path)
  store.commit('tagsview/removeTags')
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  border: 0 !important;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  background-color: #fff;
  margin: 0 5px;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
}
// .tabs {
//   position: fixed;
//   top: 64px;
//   z-index: 99;
// }
</style>
