import { CommodityInfo } from '../types'

const headers = {
  'Content-Type': 'application/json'
}

export default {
  getAllCommodity () {
    return fetch('/api/commodityList', {
      method: 'GET',
      headers,
    })
    .then((response) => response.json())
  },
  addCommodity (data: CommodityInfo) {
    return fetch('/api/addCommodity', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },
  updateCommodity (data: CommodityInfo) {
    return fetch('/api/updateCommodity', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },
  removeCommodity (id: string) {
    return fetch('/api/removeCommodity', {
      method: 'POST',
      headers,
      body: JSON.stringify(id),
    })
    .then((response) => response.json())
  },
}