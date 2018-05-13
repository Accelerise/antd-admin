import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryMap } from 'services/chengjiao'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'mapCMP',
  state: {
    dataset: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/map_cmp' || pathname === '/') {
          dispatch({ type: 'queryMap' })
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
        payload: { dataset: response.data },
      })
    },
  },
})
