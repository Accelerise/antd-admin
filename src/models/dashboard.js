import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryChengjiaos, queryDashboard, queryHistoryAvg } from 'services/dashboard'
import { model } from 'models/common'
import moment from 'moment'
import { color } from '../utils/theme'

const dateFormat = unix => new Date(unix * 1000).format('yyyy-MM-dd')

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    cards: [],
    recentChengjiaos: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const aMonthBefore = moment().subtract(1, 'month').unix()
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({ type: 'queryChengjiaos' })
          dispatch({ type: 'queryHistoryAvg', payload: { from: aMonthBefore, accuracy: 'Day' } })
          dispatch({ type: 'queryDashboard', payload: { from: aMonthBefore } })
        }
      })
    },
  },
  effects: {
    * queryChengjiaos ({
      payload,
    }, { call, put }) {
      const response = yield call(queryChengjiaos, parse(payload))
      yield put({
        type: 'updateState',
        payload: { recentChengjiaos: response },
      })
    },
    * queryDashboard ({ payload }, { call, put }) {
      const response = yield call(queryDashboard, parse(payload))
      const { totalPriceAvg, unitPriceAvg, chengjiaoCount } = response.data
      const cards = [
        {
          icon: 'pay-circle-o',
          color: color.green,
          title: '平均成交额（万）',
          number: totalPriceAvg,
        }, {
          icon: 'appstore',
          color: color.blue,
          title: '平均单价（元/平米）',
          number: unitPriceAvg,
        }, {
          icon: 'form',
          color: color.purple,
          title: '成交数（个）',
          number: chengjiaoCount,
        },
      ]
      yield put({
        type: 'updateState',
        payload: { cards },
      })
    },

    * queryHistoryAvg ({ payload }, { call, put }) {
      const response = yield call(queryHistoryAvg, parse(payload))
      const { unitPriceAvgPoints } = response.data
      const unitPriceAvgs = unitPriceAvgPoints.map(point => ({ avg: point[1], sign_at: dateFormat(point[0]) }))
      yield put({
        type: 'updateState',
        payload: { unitPriceAvgs },
      })
    },
  },
})
