import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryRise } from 'services/ershou'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'topPriceRise',
  state: {
    topRiseErshous: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/top_price_rise' || pathname === '/') {
          dispatch({ type: 'queryRise' })
        }
      })
    },
  },
  effects: {
    * queryRise ({
      payload,
    }, { call, put }) {
      const response = yield call(queryRise, parse(payload))
      yield put({
        type: 'updateState',
        payload: { topRiseErshous: response.data },
      })
    },
  },
})
