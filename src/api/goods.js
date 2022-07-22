import request from '@/utils/request'

const getGoods = (count, data) => {
  return request({ url: `/admin/goods/${count}`, method: 'get', data })
}

export default {
  getGoods
}
