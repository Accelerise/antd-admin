import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import List from './List'


const TopPriceCut = ({ topPriceCut, loading }) => {
  console.log(topPriceCut)
  const listProps = {
    dataSource: topPriceCut.topCutErshous,
    loading: loading.effects['topPriceCut/queryCut'],
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

TopPriceCut.propTypes = {
  topPriceCut: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(data => data)(TopPriceCut)
