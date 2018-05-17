import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  return (
    <div>
      <Table
        {...tableProps}
        bordered
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
