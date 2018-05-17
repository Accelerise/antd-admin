import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryErshouRise } from 'services/ershou'
import { queryZufangRise } from 'services/zufang'
import { model } from 'models/common'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'topPriceRise',
  state: {
    topRiseErshous: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/top_price_rise' || pathname === '/') {
          dispatch({ type: 'queryRise', payload: { ...queryString.parse(search) } })
        }
      })
    },
  },
  effects: {
    * queryRise ({
      payload,
    }, { call, put }) {
      let response
      if (payload.type === 'zufang') {
        response = yield call(queryZufangRise, parse(payload))
      } else {
        response = yield call(queryErshouRise, parse(payload))
      }
      yield put({
        type: 'updateState',
        payload: { topRiseStats: response.data },
      })
    },
  },
})
