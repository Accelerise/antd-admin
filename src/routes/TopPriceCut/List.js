import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { color } from '../../utils/theme'

const totalPriceFormatter = text => `${text} 万 `
const rentFormatter = text => `${text} 元/平米`

const Indicator = (props) => {
  let formatter = totalPriceFormatter
  if (props.type === 'zufang') {
    formatter = rentFormatter
  }
  if (props.number > 0) {
    return <span style={{ color: color.red }}>{`${formatter(props.number)}↑`}</span>
  }
  if (props.number < 0) {
    return <span style={{ color: color.green }}>{`${formatter(props.number)}↓`}</span>
  }
  return <span>{formatter(props.number)}</span>
}

Indicator.propTypes = {
  number: PropTypes.number,
}

const List = ({ type, ...tableProps }) => {
  let formatter = totalPriceFormatter
  if (type === 'zufang') {
    formatter = rentFormatter
  }
  const columns = [
    {
      title: '链接',
      dataIndex: 'url',
      render: url => <a href={url} target="_blank">{`${url.substr(0, 20)}...`}</a>,
    }, {
      title: '最低价',
      dataIndex: 'min_total_price',
      render: formatter,
    }, {
      title: '最高价',
      dataIndex: 'max_total_price',
      render: formatter,
    }, {
      title: '当前价',
      dataIndex: 'current_price',
      render: formatter,
    }, {
      title: '收集时间',
      dataIndex: 'scan_at',
      render: text => new Date(text * 1000).format('yyyy-MM-dd'),
    }, {
      title: '相比最高价',
      dataIndex: 'decrease_by_max',
      render: text => <Indicator number={text} type={type} />,
    }, {
      title: '相比最低价',
      dataIndex: 'rise_by_min',
      render: text => <Indicator number={text} type={type} />,
    },
  ]

  return (
    <Table
      {...tableProps}
      columns={columns}
      rowKey={record => record.id}
    />
  )
}

export default List
