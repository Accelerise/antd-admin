import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryErshouCut } from 'services/ershou'
import { queryZufangCut } from 'services/zufang'
import { model } from 'models/common'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'topPriceCut',
  state: {
    topRiseErshous: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/top_price_cut' || pathname === '/') {
          dispatch({ type: 'queryCut', payload: { ...queryString.parse(search) } })
        }
      })
    },
  },
  effects: {
    * queryCut ({
      payload,
    }, { call, put }) {
      let response
      if (payload.type === 'zufang') {
        response = yield call(queryZufangCut, parse(payload))
      } else {
        response = yield call(queryErshouCut, parse(payload))
      }
      yield put({
        type: 'updateState',
        payload: { topCutStats: response.data },
      })
    },
  },
})
