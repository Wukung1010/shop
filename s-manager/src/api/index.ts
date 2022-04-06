import { Commodity, Order } from '../../../types'

const CONFIG = {
  
}

const HEADER_JSON = {
  'content-type': 'application/json',
}

let errorHandler = (error: any) => {
  console.error(error)
}

function http (url: string, options: RequestInit) {
  return fetch(url, options).then((res) => {
    if (res.status !== 200) {
      errorHandler(res)
    } else {
      return res.json()
    }
  })
}

export default {
  setErrorHandler (fn: (res: Response) => void) {
    errorHandler = fn
  },
  login (data: { user: string; password: string; }) {
    return http('/api/login', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
  },
  getAllCommodities () {
    return http('/api/commodity/all', {
      method: 'GET',
      headers: HEADER_JSON,
    })
  },
  getSomeCommodities (title: string) {
    return http('/api/commodity/find', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ title }),
    })
  },
  addCommodity (data: Pick<Commodity, 'title'|'price'|'priceUnit'|'fare'|'count'>) {
    return http('/api/commodity/add', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
  },
  updateCommodity (data: Pick<Commodity, 'title'|'price'|'priceUnit'|'fare'|'count'>) {
    return http('/api/commodity/update', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
    
  },
  removeCommodity (id: string) {
    return http('/api/commodity/remove', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ id }),
    })
  },
  getAllOrders () {
    return http('/api/order/all', {
      method: 'GET',
      headers: HEADER_JSON,
    })
  },
  updateOrder (order: Order) {
    return http('/api/order/update', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(order)
    })
  },
  removeOrder (id: string) {
    return http('/api/order/remove', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ id })
    })
  },
}
