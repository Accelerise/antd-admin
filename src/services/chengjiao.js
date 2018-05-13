import { request, config } from 'utils'

const { api } = config
const { chengjiao, xiaoqus } = api

export function queryHistory (params) {
  return request({
    url: `${chengjiao}/history`,
    method: 'get',
    data: params,
  })
}

export function queryXiaoqu (params) {
  return request({
    url: xiaoqus,
    method: 'get',
    data: params,
  })
}

export function queryMap (params) {
  return request({
    url: `${chengjiao}/map`,
    method: 'get',
    data: params,
  })
}
