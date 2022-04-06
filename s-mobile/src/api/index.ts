import { Commodity, Order, OrderState } from "../../../types"

const SERVER_ADRESS = ''
const PRE = '/api/mobile'

const cache = new Map<String, Commodity>()
let errorHandler = (code: Error) => {
  console.log(code.message)
}
const responseHandler = (response: Response) => {
  if (response.ok) return response.json()
  throw new Error(`${response.status}`)
}

export default {
  getCommodityList () {
    return fetch(`${PRE}/commodity/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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
        headers: {
          'Content-Type': 'application/json'
        },
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
  updateOrder (order: Order) {
    return fetch(`${PRE}/order/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: order.id, state: OrderState.CANNEL })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  submitOrder (order: Order) {
    return fetch(`${PRE}/order/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  searchOrder (phone: string) {
    return fetch(`${PRE}/order/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, state: OrderState.PRE_PAY })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  searchCannelOrder (phone: string) {
    return fetch(`${PRE}/order/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, state: OrderState.CANNEL })
    })
    .then(responseHandler)
    .catch((err) => errorHandler(err))
  },
  errorHandler (fn: (code: Error) => void) {
    errorHandler = fn
  }
}
