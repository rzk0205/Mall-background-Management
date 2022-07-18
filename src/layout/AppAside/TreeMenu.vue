<template>
  <template v-if="menus && menus.child.length <= 0">
    <el-menu-item :index="menus.frontpath">
      <!-- <el-icon><icon-menu /></el-icon> -->
      <SvgIcon :icon="menus.icon"></SvgIcon>
      <span>{{ menus.name }}</span>
    </el-menu-item>
  </template>
  <template v-if="menus && menus.child && menus.child.length > 0">
    <el-sub-menu :index="menus.child[0].frontpath">
      <template #title>
        <!-- <el-icon><location /></el-icon> -->
        <SvgIcon :icon="menus.icon"></SvgIcon>
        <span>{{ menus.name }}</span>
      </template>

      <TreeMenu
        v-for="(childItem, index) in menus.child"
        :key="index"
        :menus="childItem"
      ></TreeMenu>
    </el-sub-menu>
  </template>
</template>

<script setup>
import { defineProps } from 'vue'
import SvgIcon from '../../components/SvgIcon.vue'
const props = defineProps({
  menus: {
    type: Object,
    default: () => {}
  }
})
// eslint-disable-next-line vue/no-setup-props-destructure
const menus = props.menus
</script>

<style scoped lang="scss"></style>
