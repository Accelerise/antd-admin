import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '小区名',
      dataIndex: 'xq_name',
    }, {
      title: '链接',
      dataIndex: 'href',
    }, {
      title: '平均总价',
      dataIndex: 'total_price_avg',
    }, {
      title: '平均单价',
      dataIndex: 'unit_price_avg',
    }, {
      title: '修建年份',
      dataIndex: 'year',
    }, {
      title: '平均面积',
      dataIndex: 'area_avg',
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
