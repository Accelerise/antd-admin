import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import List from '../TopPriceCut/List'


const TopPriceRise = ({ topPriceRise, loading }) => {
  const listProps = {
    dataSource: topPriceRise.topRiseErshous,
    loading: loading.effects['topPriceRise/queryRise'],
    onChange (page) {
      console.log(page)
    },
  }


  return (
    <Page inner>
      <List {...listProps} />
    </Page>
  )
}

TopPriceRise.propTypes = {
  topPriceRise: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(data => data)(TopPriceRise)
