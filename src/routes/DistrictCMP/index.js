import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Row, Col, Card, DatePicker, Button, Tag } from 'antd'
import moment from 'moment'
import queryString from 'query-string'
import { Page } from 'components'
import List from './List'

const { RangePicker } = DatePicker

class DistrictCMP extends React.Component {
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
  handleEntranceClick = (district) => {
    this.setUrlQuery({ district })
    // this.props.dispatch({ type: 'districtCMP/queryDistrictStat', payload: { district } })
  }
  handleDistrictTagClose = () => {
    this.setUrlQuery({ district: undefined })
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

  render () {
    const {
      districtCMP, dispatch, loading, location,
    } = this.props
    const { districtStats } = districtCMP
    location.query = queryString.parse(location.search)
    const { query, pathname } = location

    const listProps = {
      dataSource: districtStats,
      loading: loading.effects['districtCMP/queryDistrictStat'],
      columns: [
        {
          title: '区域名称',
          dataIndex: 'name',
        }, {
          title: '每平米价格',
          dataIndex: 'count',
          render: text => `${text} 元/平米`,
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.count - b.count,
        },
      ],
    }
    if (!query.district) {
      listProps.columns.push({
        title: '操作',
        render: (value, stat) => (
          <Button
            type="primary"
            onClick={() => {
              this.handleEntranceClick(stat.name)
            }}
          >查看详情</Button>
        ),
      })
    }
    return (
      <Page inner>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card bordered={false} title="起止时间">
              <RangePicker value={this.getUrlQueryFromUntil()} onChange={this.handleRangePickerChange} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} title="城市区划">
              {query.district && <Tag color="blue" closable onClose={this.handleDistrictTagClose}>{query.district}</Tag>}
            </Card>
          </Col>
        </Row>
        <List {...listProps} />
      </Page>
    )
  }
}

DistrictCMP.propTypes = {
  districtCMP: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(props => props)(DistrictCMP)
