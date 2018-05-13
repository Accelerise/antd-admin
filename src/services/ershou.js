import { request, config } from 'utils'

const { api } = config
const { ershou } = api

export function queryRise (params) {
  return request({
    url: `${ershou}/top_rise`,
    method: 'get',
    data: params,
  })
}

export function queryCut (params) {
  return request({
    url: `${ershou}/top_decrease`,
    method: 'get',
    data: params,
  })
}
