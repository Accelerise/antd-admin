import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {Map, Marker, MapvLayer, InfoWindow, NavigationControl} from 'react-bmap'
import { Row, Col, Card, DatePicker, Slider, Button, Form } from 'antd'
import moment from 'moment'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Page } from 'components'

const { RangePicker } = DatePicker
const FormItem = Form.Item

const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
}

// var polygonData = [
//   {geometry: {"type":"Polygon","coordinates":[[[116.417475,39.923688],[116.42078,39.919704],[116.413881,39.918708],[116.412013,39.921917]]]}},
//   {geometry: {"type":"Polygon","coordinates":[[[116.416828,39.924573],[116.411007,39.924407],[116.41036,39.927451],[116.422721,39.928502]]]}}
// ]

class MapCMP extends React.Component {
  setUrlQuery = (nextQuery) => {
    const query = queryString.parse(this.props.location.search)
    this.props.dispatch(routerRedux.push({
      search: queryString.stringify({
        ...query,
        ...nextQuery,
      }),
    }))
  }
  decodeRangePicker = (range) => {
    if (Array.isArray(range)) {
      return {
        from: range[0].unix(),
        until: range[1].unix(),
      }
    }
    return { from: undefined, until: undefined }
  }

  decodePriceRange = (range) => {
    if (Array.isArray(range)) {
      return { percentl: range[0], percentr: range[1] }
    }
    return { percentl: undefined, percentr: undefined }
  }

  getUrlQuery = (key) => {
    const query = queryString.parse(this.props.location.search)
    return query[key]
  }

  getUrlQueryPriceRange = () => {
    const priceRange = []
    priceRange[0] = Number(this.getUrlQuery('percentl') || 0)
    priceRange[1] = Number(this.getUrlQuery('percentr') || 25)
    return priceRange
  }

  handleSubmit = () => {
    this.props.form.validateFields((error, value) => {
      const { dateRange, priceRange } = value
      const query = { ...this.decodeRangePicker(dateRange), ...this.decodePriceRange(priceRange) }
      this.setUrlQuery(query)
    })
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
    const { mapCMP, historyAVG } = this.props
    const { getFieldDecorator } = this.props.form

    const { dataset, minPrice } = mapCMP
    const { unitPriceAvgPoints, xiaoqus } = historyAVG

    return (
      <Page inner>
        <Form onSubmit={this.handleSubmit}>

        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card bordered={false} title="起止时间">
              <FormItem>
                {getFieldDecorator('dateRange', {initialValue: this.getUrlQueryFromUntil()})(
                  <RangePicker />
                )}
              </FormItem>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} title="价格区间 (从高到低排序)">
              <FormItem>
                {getFieldDecorator('priceRange', {initialValue: this.getUrlQueryPriceRange()})(
                  <Slider range step={5} marks={marks} />
                )}
              </FormItem>
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <Button onClick={this.handleSubmit}>点击查询</Button>
          </Col>
        </Row>
        </Form>

        <Card bordered={false} title="成交记录分布">
          <Map center = {{
            lng: 116.450229,
            lat: 39.946158
          }}
          zoom = '13'
          >
            <NavigationControl />
          <MapvLayer data={dataset} options={{
            gradient: { // 热力图渐变色
            0.25: "rgb(0,0,255)",
            0.55: "rgb(0,255,0)",
            0.85: "yellow",
            1.0: "rgb(255,0,0)"
        },
            shadowBlur: 10,
            globalCompositeOperation: 'lighter',
            size: 8,
            draw: 'heatmap',
            autoViewport: true,
            viewportOptions: {zoomFactor: 1}
          }} />
        </Map>
        </Card>

  </Page>
  )
  }
}

MapCMP.propTypes = {
  location: PropTypes.object,
  form: PropTypes.object,
}

export default connect(props => props)(Form.create()(MapCMP))
