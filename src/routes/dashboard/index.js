import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading }) {
  const {
    weather, sales, quote, numbers, recentChengjiaos, comments, completed, browser, cpu, user,
  } = dashboard
  const numberCards = numbers.map((item, key) => (<Col key={key} md={8}>
    <NumberCard {...item} />
  </Col>))

  return (
    <Page loading={loading.models.dashboard && sales.length === 0} className={styles.dashboard}>
      <Row gutter={24}>
        {numberCards}
        <Col md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Sales data={sales} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentChengjiaos} />
          </Card>
        </Col>
        {/* <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Completed data={completed} />
          </Card>
        </Col> */}
      </Row>
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
