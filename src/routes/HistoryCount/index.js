import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Select, DatePicker, Radio } from 'antd'
import { Page } from 'components'
import HighstockComponent from './HighstockComponent'
import styles from './index.less'

const { Option } = Select
const { RangePicker } = DatePicker
const { Group: RadioGroup, Button: RadioButton } = Radio

function HistoryCount ({ loading }) {
  return (
    <Page inner>
      <Row gutter={24}>
        <Col lg={8} md={24}>
          <Card bordered={false} title="起止时间">
            <RangePicker />
          </Card>

        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} title="时间间隔">
            <RadioGroup defaultValue="a">
              <RadioButton value="Year">年</RadioButton>
              <RadioButton value="Quarter">季</RadioButton>
              <RadioButton value="Month">月</RadioButton>
              <RadioButton value="Day">日</RadioButton>
            </RadioGroup>
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} title="小区（可选）">
            <Select style={{ width: 240 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Card>
        </Col>
      </Row>
      <HighstockComponent />
    </Page>
  )
}

HistoryCount.propTypes = {

}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(HistoryCount)
