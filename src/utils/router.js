export const filterRoutes = (menus) => {
  const newRoutes = []
  menus.forEach((item) => {
    if (item.child && item.child.length > 0) {
      item.child.forEach((childItem) => {
        const routes = menuRoutes(childItem)

        newRoutes.push(routes)
      })
    }
  })
  newRoutes.push({
    path: '/:catchAll(.*)',
    redirect: '/404'
  })
  return newRoutes
}
const menuRoutes = (item) => {
  // console.log(item.frontpath)

  const route = {
    path: item.frontpath,
    name: item.desc,
    meta: {
      title: item.name,
      icon: item.icon
    }
  }
  const path = item.icon
  // console.log(path)
  route.component = () => import('@/views/' + path)
  return route
}

// const filterFolder = (item) => {
//   const index = item.indexOf('/')
//   return item.substring(index + 1).toLowerCase()
// }
