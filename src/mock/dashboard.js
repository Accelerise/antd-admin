import { color } from '../utils/theme'

const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

const Dashboard = Mock.mock({
  'recentChengjiaos|36': [
    {
      'id|+1': 1,
      xq_name: '@last',
      style: '两室一厅',
      'area|40-120': 1,
      sign_at () {
        return `${Mock.Random.integer(2015, 2016)}-${Mock.Random.date('MM-dd')} ${Mock.Random.time('HH:mm:ss')}`
      },
      'unit_price|300-600.1-7': 1,
      'total_price|10-200.1-2': 1,
    },
  ],
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: '平均成交额（万）',
      number: 2781,
    }, {
      icon: 'appstore',
      color: color.blue,
      title: '平均单价（元/平米）',
      number: 39901,
    }, {
      icon: 'form',
      color: color.purple,
      title: '成交数（个）',
      number: 253,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
