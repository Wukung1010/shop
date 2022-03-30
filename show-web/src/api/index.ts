import { CommodityInfo, OrderInfo } from "../types"

const SERVER_ADRESS = ''

const cache = new Map<String, CommodityInfo>()

export default {
  getCommodityList () {
    return fetch('/api/commodityList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
  },
  getCommodity (id: string, shopID = '') {
    if (cache.has(id)) {
      return Promise.resolve(cache.get(id))
    } else {
      return fetch('/api/commodity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, shopID })
      })
      .then(response => response.json())
      .then((data) => {
        cache.set(id, data)
        return data
      })
    }
  },
  submitOrder (order: OrderInfo) {
    return fetch('/api/submitOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(response => response.json())
  },
  searchOrder (phone: string) {
    return fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
    .then(response => response.json())
  },
  searchChangeOrder (phone: string) {
    return fetch('/api/changeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })
    .then(response => response.json())
  },
}
