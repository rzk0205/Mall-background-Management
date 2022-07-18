<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AppMain from './AppMain'
import AppAside from './AppAside'
import AppHeader from './AppHeader'
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
.el-aside {
  height: calc(100vh - 64px);
}
.el-main {
  background-color: #f3f4f6;
}
.el-header {
  --el-header-padding: 0;
  --el-header-height: 64px;
  padding: var(--el-header-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height);
}
</style>
