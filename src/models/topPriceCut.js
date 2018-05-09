import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query } from 'services/dashboard'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'topPriceCut',
  state: {
    weather: {
      city: '深圳',
      temperature: '30',
      name: '晴',
      icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/history_avg' || pathname === '/') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({
        type: 'updateState',
        payload: data,
      })
    },
  },
})
