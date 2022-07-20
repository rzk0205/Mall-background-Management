<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      :style="{ width: isCollapse ? '60px' : '250px' }"
      collapse-transition
      unique-opened
      router
    >
      <TreeMenu v-for="item in menus" :key="item" :menus="item"></TreeMenu>
    </el-menu>
  </div>
</template>

<script setup>
import TreeMenu from './TreeMenu.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const menus = computed(() => {
  return store.getters.menus
})
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
  overflow: hidden;
  background-color: #ffffff;
}
</style>
