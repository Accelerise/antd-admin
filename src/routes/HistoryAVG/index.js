import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Select, DatePicker, Radio } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import HighstockComponent from './HighstockComponent'


const { Option } = Select
const { RangePicker } = DatePicker
const { Group: RadioGroup, Button: RadioButton } = Radio

class HistoryAVG extends React.Component {
  setUrlQuery = (nextQuery) => {
    const query = queryString.parse(this.props.location.search)
    this.props.dispatch(routerRedux.push({
      search: queryString.stringify({
        ...query,
        ...nextQuery,
      }),
    }))
  }
  handleRangePickerChange = (range) => {
    this.setUrlQuery({
      from: range[0].unix(),
      until: range[1].unix(),
    })
  }
  handleAccuracyChange = ({ target: { value: accuracy } }) => {
    this.setUrlQuery({ accuracy })
  }
  handleXiaoquChange = (xiaoqu) => {
    this.setUrlQuery({ xiaoqu })
  }
  getUrlQuery = (key) => {
    const query = queryString.parse(this.props.location.search)
    return query[key]
  }

  getUrlQueryFromUntil = () => {
    const query = queryString.parse(this.props.location.search)
    let from = moment().subtract(1, 'year')
    let until = moment()
    if (query.from) {
      from = moment(query.from * 1000)
    }
    if (query.until) {
      until = moment(query.until * 1000)
    }
    return [from, until]
  }
  getUrlQueryAccuracy = () => {
    return this.getUrlQuery('accuracy') || 'Month'
  }
  getUrlQueryXiaoqu = () => {
    return this.getUrlQuery('xiaoqu') || ''
  }

  handleXiaoquSearch = (name) => {
    this.props.dispatch({ type: 'historyAVG/queryXiaoqu', payload: { name } })
  }

  render () {
    const { historyAVG } = this.props
    const { unitPriceAvgPoints, xiaoqus } = historyAVG
    return (
      <Page inner>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card bordered={false} title="起止时间">
              <RangePicker value={this.getUrlQueryFromUntil()} onChange={this.handleRangePickerChange} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} title="时间间隔">
              <RadioGroup defaultValue="Quarter" value={this.getUrlQueryAccuracy()} onChange={this.handleAccuracyChange}>
                <RadioButton value="Year">年</RadioButton>
                <RadioButton value="Quarter">季</RadioButton>
                <RadioButton value="Month">月</RadioButton>
                <RadioButton value="Day">日</RadioButton>
              </RadioGroup>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} title="小区（可选）">
              <Select showSearch style={{ width: 240 }} value={this.getUrlQueryXiaoqu()} onChange={this.handleXiaoquChange} onSearch={this.handleXiaoquSearch}>
                {xiaoqus.map(xiaoqu => <Option key={xiaoqu.name} value={xiaoqu.name}>{xiaoqu.name}</Option>)}
              </Select>
            </Card>
          </Col>
        </Row>
        <HighstockComponent data={unitPriceAvgPoints} />
      </Page>
    )
  }
}

HistoryAVG.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  historyAVG: PropTypes.object,
}

export default connect(props => props)(HistoryAVG)
