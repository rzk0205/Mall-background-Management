<template>
  <div class="box">
    <div class="tag"><TagsViewVue></TagsViewVue></div>
    <div class="crad">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import TagsViewVue from '@/components/TagsView.vue'
</script>

<style scoped lang="scss">
.tags {
  position: relative;
}
.crad {
  width: 100%;
  height: calc(100vh - 164px);
  padding: 20px;
  box-sizing: border-box;
  // overflow: hidden;
  // background-color: #fff;
}
// .box {
//   position: relative;
//   height: calc(100vh - 64px);
// }
// .tag {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 99;
// }
</style>
