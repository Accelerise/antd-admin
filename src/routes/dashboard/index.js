import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Page } from 'components'
import { NumberCard, Sales, RecentSales } from './components'
import styles from './index.less'

function Dashboard ({ dashboard, loading, dispatch }) {
  const { cards, recentChengjiaos, unitPriceAvgs } = dashboard
  const numberCards = cards.map((item, key) => (<Col key={key} md={8}>
    <NumberCard {...item} />
  </Col>))

  const handlePaginate = (page, size) => {
    dispatch({ type: 'dashboard/queryChengjiaos', payload: { offset: (page - 1) * size, limit: size } })
  }

  return (
    <Page className={styles.dashboard}>
      <Row gutter={24}>
        {numberCards}
        <Col md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Sales data={unitPriceAvgs} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false} >
            <RecentSales data={recentChengjiaos} onPaginate={handlePaginate} loading={loading.models.dashboard} />
          </Card>
        </Col>
      </Row>
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
