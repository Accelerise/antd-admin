import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryMap } from 'services/chengjiao'
import { model } from 'models/common'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'mapCMP',
  state: {
    dataset: [],
    minPrice: 0,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/map_cmp' || pathname === '/') {
          dispatch({ type: 'queryMap', payload: { ...queryString.parse(search) } })
        }
      })
    },
  },
  effects: {
    * queryMap ({
      payload,
    }, { call, put }) {
      const response = yield call(queryMap, parse(payload))

      yield put({
        type: 'updateState',
        payload: { dataset: response.data, minPrice: response.min_price },
      })
    },
  },
})
