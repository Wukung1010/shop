import { Commodity, Order, OrderState } from '../types'

const SERVER_ADRESS = ''
const PRE = '/api/mobile'
const HEADERS = {
  'Content-Type': 'application/json'
}

const cache = new Map<String, Commodity>()
let errorHandler = (code: Error) => {
  console.log(code.message)
}
const responseHandler = (response: Response) => {
  if (response.ok) return response.json()
  throw new Error(`${response.status}`)
}

export default {
  getUserAddress (phone: string) {
    return fetch(`${PRE}/order/user`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ phone })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  getCommodityList () {
    return fetch(`${PRE}/commodity/all`, {
      method: 'GET',
      headers: HEADERS,
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  getCommodity (id: string, shopID = '') {
    if (cache.has(id)) {
      return Promise.resolve(cache.get(id))
    } else {
      return fetch(`${PRE}/commodity/find`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ id, shopID })
      })
      .then(responseHandler)
      .then((data) => {
        cache.set(id, data)
        return data
      })
      .catch((err) => errorHandler(err))
    }
  },
  updateOrder (id: number, state: OrderState) {
    return fetch(`${PRE}/order/update`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ id, state })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  submitOrder (order: Order) {
    return fetch(`${PRE}/order/add`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(order)
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  searchOrder (phone: string) {
    return fetch(`${PRE}/order/find`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ phone })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  searchCannelOrder (phone: string) {
    return fetch(`${PRE}/order/find`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ phone })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  errorHandler (fn: (code: Error) => void) {
    errorHandler = fn
  }
}
