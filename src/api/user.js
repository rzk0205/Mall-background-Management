import request from '@/utils/request'

const login = (data) => {
  return request({ url: '/admin/login', method: 'post', data })
}
const getUserInfo = () => {
  return request({ url: '/admin/getinfo', method: 'post' })
}
const logout = () => {
  return request({ url: '/admin/logout', method: 'post' })
}
export default {
  login,
  getUserInfo,
  logout
}
