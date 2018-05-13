import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { color } from '../../utils/theme'

const Indicator = (props) => {
  if (props.number > 0) {
    return <span style={{ color: color.red }}>{`${props.number} 万↑`}</span>
  }
  if (props.number < 0) {
    return <span style={{ color: color.green }}>{`${props.number} 万↓`}</span>
  }
  return <span>{`${props.number} 万`}</span>
}

Indicator.propTypes = {
  number: PropTypes.number,
}

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '链接',
      dataIndex: 'url',
      render: url => <a href={url} target="_blank">{`${url.substr(0, 20)}...`}</a>,
    }, {
      title: '最低价',
      dataIndex: 'min_total_price',
      render: text => `${text} 万`,
    }, {
      title: '最高价',
      dataIndex: 'max_total_price',
      render: text => `${text} 万`,
    }, {
      title: '当前价',
      dataIndex: 'current_price',
      render: text => `${text} 万`,
    }, {
      title: '收集时间',
      dataIndex: 'scan_at',
      render: text => new Date(text * 1000).format('yyyy-MM-dd'),
    }, {
      title: '相比最高价',
      dataIndex: 'decrease_by_max',
      render: text => <Indicator number={text} />,
    }, {
      title: '相比最低价',
      dataIndex: 'rise_by_min',
      render: text => <Indicator number={text} />,
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
