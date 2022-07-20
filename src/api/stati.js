import request from '../utils/request'

const statiCard = () => {
  return request({ url: '/admin/statistics1', method: 'get' })
}

const statiEc = (data) => {
  return request({
    url: `/admin/statistics3?type=${data}`,
    method: 'get',
    data
  })
}
const statiData = () => {
  return request({ url: '/admin/statistics2', method: 'get' })
}
export default {
  statiCard,
  statiEc,
  statiData
}
