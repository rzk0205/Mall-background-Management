<template>
  <div class="header">
    <div class="header-left">
      <SvgIcon class="plat" icon="elm"></SvgIcon>
      <!-- <SvgIcon :icon="platform"></SvgIcon> -->
      <span>积云编程</span>
    </div>
    <div class="header-right">
      <div class="left">
        <div class="icon-btn">
          <span @click="handleCollapseMenu"
            ><SvgIcon v-if="iconStatus" icon="s-unfold"></SvgIcon>
            <SvgIcon v-else icon="s-fold"></SvgIcon>
          </span>
        </div>
        <div class="icon-btn" @click="refresh">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="刷新"
            placement="bottom"
          >
            <span><SvgIcon icon="refresh"></SvgIcon></span>
          </el-tooltip>
        </div>
      </div>
      <div class="right">
        <div class="icon-btn click" @click="fullScreen">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="全屏"
            placement="bottom"
          >
            <span
              ><SvgIcon
                :icon="fullScreenStatus ? 'aim' : 'full-screen'"
              ></SvgIcon
            ></span>
          </el-tooltip>
        </div>
        <div class="avatarImg">
          <el-avatar :size="30" :src="userInfo.avatar" />
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="home">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '../../components/SvgIcon.vue'
import { ElNotification, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const fullScreenStatus = ref(false)
const userInfo = computed(() => {
  return store.getters.userInfo
})
const refresh = () => {
  location.reload()
}
const fullScreen = () => {
  if (!fullScreenStatus.value) {
    fullScreenStatus.value = true
    document.documentElement.webkitRequestFullscreen()
  } else {
    fullScreenStatus.value = false
    document.webkitExitFullscreen()
  }
}
const handleCollapseMenu = () => {
  // iconStatus = !iconStatus
  store.dispatch('menu/setCollapse')
}
const iconStatus = computed(() => {
  return store.getters.isCollapse
})
const handleCommand = (command) => {
  switch (command) {
    case 'home':
      handleToHome()
      break
    case 'logout':
      handleLogout()
      break
  }
}
const handleToHome = () => {
  alert('修改密码')
}
const handleLogout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await store.dispatch('user/logout')
      if (res.msg === 'ok') {
        router.push('/login')
        ElNotification({
          message: res.data,
          type: 'success'
        })
      }
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.header {
  width: 100vw;
  height: 64px;
  background-color: #4338ca;
  line-height: 64px;
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  display: flex;
  .header-left {
    width: 250px;
    text-align: center;
  }
  .header-right {
    width: calc(100vw - 250px);
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .avatarImg {
      height: 60px;
      width: 45px;
      padding-top: 6px;
      box-sizing: border-box;
    }
    .left {
      height: 100%;
      display: flex;
      justify-content: space-around;
    }
    .icon-btn {
      height: 100%;
      width: 42px;
      text-align: center;
      span {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba($color: #ffffff, $alpha: 0.1);
      }
    }
    .click {
      margin-right: 20px;
    }
  }
  .el-dropdown {
    font-size: var(--el-font-size-base);
    --tw-text-opacity: 1;
    color: rgba(253, 253, 253, var(--tw-text-opacity));
    vertical-align: middle;
  }
  .plat {
    font-size: 18px;
  }
}
</style>
