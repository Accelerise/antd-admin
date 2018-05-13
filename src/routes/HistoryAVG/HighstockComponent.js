import React from 'react'
import PropTypes from 'prop-types'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import { number } from '../../utils/formatter'

const config = {
  rangeSelector: {
    selected: 1,
  },
  title: {
    text: '历史成交价格 (元/平米)',
  },
  series: [],
}

const HighstockComponent = ({ data, formatter }) => {
  const points = data.map(point => [point[0] * 1000, point[1]])
  const series = [{ name: '平均价格', data: points }]
  const pointFormatter = function () {
    return `<span style="color:${this.color}">\u25CF</span> 平均价格: <b>${formatter(this.y)}</b><br/>`
  }
  const tooltip = { pointFormatter }
  return <ReactHighstock config={{ ...config, series, tooltip }} />
}

HighstockComponent.propTypes = {
  data: PropTypes.array,
  formatter: PropTypes.func,
}

HighstockComponent.defaultProps = {
  data: [],
  formatter: number.currency.cnyByYuan,
}

export default HighstockComponent
