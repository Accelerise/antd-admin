import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { color } from 'utils'
import styles from './recentSales.less'

const status = {
  1: {
    color: color.green,
    text: 'SALE',
  },
  2: {
    color: color.yellow,
    text: 'REJECT',
  },
  3: {
    color: color.red,
    text: 'TAX',
  },
  4: {
    color: color.blue,
    text: 'EXTENDED',
  },
}

function RecentSales ({ data }) {
  const columns = [
    {
      title: '小区名',
      dataIndex: 'xq_name',
    }, {
      title: '面积',
      dataIndex: 'area',
    }, {
    //   title: '链接',
    //   dataIndex: 'area',
    // }, {
      title: '签约时间',
      dataIndex: 'sign_at',
      render: text => new Date(text).format('yyyy-MM-dd'),
    }, {
      title: '房型',
      dataIndex: 'style',
    }, {
      title: '单价',
      dataIndex: 'unit_price',
    }, {
      title: '总价',
      dataIndex: 'total_price',
    },
  ]
  return (
    <div className={styles.recentsales}>
      <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={data.filter((item, key) => key < 5)} />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales
