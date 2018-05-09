/*
  number - 包含对数字的各种格式化方法
*/

export function commas(num) {
  if (typeof num !== 'string') num = String(num)
  const parts = num.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function fixed(num, precision = 2) {
  const factor = 10 ** precision
  return (Math.round(num * factor) / factor).toFixed(precision)
}

export function precision(num, precision = 2) {
  const factor = 10 ** precision
  return String(Math.round(num * factor) / factor)
}

export function percent(num, p = 2) {
  return commas(precision(num * 100, p)) + '%'
}

export function count(num, p = 2, units = ' KMB') {
  let level = 0

  while (Math.abs(num) >= 1000) {
    num /= 1000
    level += 1
  }
  return (precision(num, p) + units[level]).trim()
}

export function cny(fen, threshold = 1e7, p = 2) {
  if (Math.abs(fen) < threshold) {
    return '¥' + commas(precision(fen / 100, p))
  }

  return '¥' + count(fen / 100, p)
}

export function cnyByYuan(yuan, threshold = 1e7, p = 2) {
  return cny(yuan * 100, threshold, p)
}

export default {
  currency: { cny, cnyByYuan },
}
