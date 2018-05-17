import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { queryDistrictStat } from 'services/chengjiao'
import { model } from 'models/common'
import queryString from 'query-string'

export default modelExtend(model, {
  namespace: 'districtCMP',
  state: {
    districtStats: [],
    regions: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/district_cmp' || pathname === '/') {
          dispatch({ type: 'queryDistrictStat', payload: { ...queryString.parse(search) } })
        }
      })
    },
  },
  effects: {
    * queryDistrictStat ({
      payload,
    }, { call, put }) {
      const response = yield call(queryDistrictStat, parse(payload))
      yield put({
        type: 'updateState',
        payload: { districtStats: response.data },
      })
    },
  },
})
