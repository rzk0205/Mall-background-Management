import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { filterRoutes } from './utils/router'
const whitelList = ['/login']

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      ElMessage('请勿重复登录')
      next(from.path)
    } else {
      if (!store.getters.userInfo) {
        const res = await store.dispatch('user/getUserInfo')
        console.log(res)
        if (res) {
          const { menus } = res.data
          console.log(menus)
          const routes = filterRoutes(menus)
          console.log(routes)
          if (routes.length > 0) {
            routes.forEach((item) => {
              router.addRoute('layout', item)
              // console.log(item)
            })
            return next(to.path)
          }
          next()
        } else {
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    if (whitelList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
