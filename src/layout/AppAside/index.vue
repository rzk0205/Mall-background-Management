<template>
  <div>
    <el-menu
      default-active=""
      class="el-menu-vertical-demo"
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
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
