import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from './recentSales.less'

function RecentSales ({ data, onPaginate, loading }) {
  const columns = [
    {
      title: '名称',
      dataIndex: 'xq_name',
      render: (text, chengjiao) => <a href={chengjiao.url} target="_blank">{`${text}-${chengjiao.style}`}</a>,
    }, {
      title: '面积',
      dataIndex: 'area',
      render: text => `${text} 平米`,
    }, {
      title: '签约时间',
      dataIndex: 'sign_at',
      render: text => new Date(text).format('yyyy-MM-dd'),
    }, {
      title: '单价',
      dataIndex: 'unit_price',
      render: text => `${text} 元/平米`,
    }, {
      title: '总价',
      dataIndex: 'total_price',
      render: text => `${text} 万`,
    },
  ]
  const handlePaginate = (page, size) => onPaginate(page, size)
  return (
    <div className={styles.recentsales}>
      <Table loading={loading} pagination={{ ...data.pagination, onChange: handlePaginate }} columns={columns} rowKey={record => record.url} dataSource={data.data} />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.object,
  onPaginate: PropTypes.func,
  loading: PropTypes.bool,
}

export default RecentSales
