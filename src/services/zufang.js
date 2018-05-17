import { request, config } from 'utils'

const { api } = config
const { zufang } = api

export function queryZufangRise (params) {
  return request({
    url: `${zufang}/top_rise`,
    method: 'get',
    data: params,
  })
}

export function queryZufangCut (params) {
  return request({
    url: `${zufang}/top_decrease`,
    method: 'get',
    data: params,
  })
}
