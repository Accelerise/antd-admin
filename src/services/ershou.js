import { request, config } from 'utils'

const { api } = config
const { ershou } = api

export function queryErshouRise (params) {
  return request({
    url: `${ershou}/top_rise`,
    method: 'get',
    data: params,
  })
}

export function queryErshouCut (params) {
  return request({
    url: `${ershou}/top_decrease`,
    method: 'get',
    data: params,
  })
}
