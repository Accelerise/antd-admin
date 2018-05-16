import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryHistory, queryXiaoqu } from 'services/chengjiao'
import { model } from 'models/common'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'historyAVG',
  state: {
    totalPriceSumPoints: [],
    totalPriceAvgPoints: [],
    unitPriceAvgPoints: [],
    xiaoqus: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/history_avg' || pathname === '/') {
          dispatch({ type: 'queryHistory', payload: { ...queryString.parse(search) } })
          dispatch({ type: 'queryXiaoqu', payload: { ...queryString.parse(search) } })
        }
      })
    },
  },
  effects: {
    * queryHistory ({
      payload,
    }, { call, put }) {
      const response = yield call(queryHistory, parse(payload))
      yield put({
        type: 'updateState',
        payload: { ...response.data },
      })
    },
    * queryXiaoqu ({ payload }, { call, put }) {
      const response = yield call(queryXiaoqu, parse(payload))
      yield put({
        type: 'updateState',
        payload: { xiaoqus: response.data },
      })
    },
  },
})
