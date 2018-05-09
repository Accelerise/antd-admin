import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '价格变动',
      dataIndex: 'max_price_cmp',
    }, {
      title: '链接',
      dataIndex: 'href',
    }, {
      title: '当前价',
      dataIndex: 'current_price',
    }, {
      title: '最高价',
      dataIndex: 'max_price',
    }, {
      title: '最低价',
      dataIndex: 'min_price',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
