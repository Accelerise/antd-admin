import { request, config } from 'utils'

const { api } = config
const { dashboard, chengjiao } = api

export function queryDashboard (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}

export function queryChengjiaos (params) {
  return request({
    url: chengjiao,
    method: 'get',
    data: params,
  })
}

export function queryHistoryAvg (params) {
  return request({
    url: `${chengjiao}/history`,
    method: 'get',
    data: params,
  })
}
