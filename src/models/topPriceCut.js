import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryCut } from 'services/ershou'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'topPriceCut',
  state: {
    topRiseErshous: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/top_price_cut' || pathname === '/') {
          dispatch({ type: 'queryCut' })
        }
      })
    },
  },
  effects: {
    * queryCut ({
      payload,
    }, { call, put }) {
      const response = yield call(queryCut, parse(payload))
      yield put({
        type: 'updateState',
        payload: { topCutErshous: response.data },
      })
    },
  },
})
