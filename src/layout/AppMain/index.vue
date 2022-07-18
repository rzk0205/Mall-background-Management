<template>
  <div>
    <div>tags</div>
    <div class="crad">
      AppMain
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.crad {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
