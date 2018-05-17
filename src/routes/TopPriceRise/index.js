import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import List from '../TopPriceCut/List'

const { TabPane } = Tabs

const EnumCommodityType = {
  ERSHOU: 'ershou',
  ZUFANG: 'zufang',
}

const TopPriceRise = ({ topPriceRise, loading, dispatch, location }) => {
  const listProps = {
    dataSource: topPriceRise.topRiseStats,
    loading: loading.effects['topPriceRise/queryCut'],
  }
  location.query = queryString.parse(location.search)
  const { query } = location

  const handleTabClick = (type) => {
    dispatch(routerRedux.push({
      search: queryString.stringify({
        type,
      }),
    }))
  }

  return (
    <Page inner>
      <Tabs activeKey={query.type === EnumCommodityType.ZUFANG ? EnumCommodityType.ZUFANG : EnumCommodityType.ERSHOU} onTabClick={handleTabClick}>
        <TabPane tab="二手房" key={EnumCommodityType.ERSHOU}>
          <List {...listProps} type={EnumCommodityType.ERSHOU} />
        </TabPane>
        <TabPane tab="租房" key={EnumCommodityType.ZUFANG}>
          <List {...listProps} type={EnumCommodityType.ZUFANG} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

TopPriceRise.propTypes = {
  topPriceRise: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(props => props)(TopPriceRise)
