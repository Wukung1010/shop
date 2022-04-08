import { Commodity, Distributor, Order } from '../types'

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
    return http('/api/manager/commodity/all', {
      method: 'GET',
      headers: HEADER_JSON,
    })
  },
  getSomeCommodities (title: string) {
    return http('/api/manager/commodity/find', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ title }),
    })
  },
  addCommodity (data: Pick<Commodity, 'title'|'price'|'priceUnit'|'fare'|'count'>) {
    return http('/api/manager/commodity/add', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
  },
  updateCommodity (data: Pick<Commodity, 'title'|'price'|'priceUnit'|'fare'|'count'>) {
    return http('/api/manager/commodity/update', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
    
  },
  removeCommodity (id: string) {
    return http('/api/manager/commodity/remove', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ id }),
    })
  },
  getAllOrders () {
    return http('/api/manager/order/all', {
      method: 'GET',
      headers: HEADER_JSON,
    })
  },
  updateOrder (order: Order) {
    return http('/api/manager/order/update', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(order)
    })
  },
  removeOrder (id: string) {
    return http('/api/manager/order/remove', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ id })
    })
  },
  getAllDistributors () {
    return http('/api/manager/distributor/all', {
      method: 'GET',
      headers: HEADER_JSON,
    })
  },
  getQR ({ id, name, phone }: Distributor) {
    const img = document.createElement('img')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 440
      canvas.height = 600
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 440, 650)

      ctx.fillStyle = 'rgb(45 212 191)'
      ctx.fillRect(0, 0, 440, 100)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 30px 微软雅黑'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('万顺丰建材配送商城', 220, 50)
      ctx.font = '20px 微软雅黑'
      ctx.fillText(name, 220, 540)
      ctx.fillText('识别二维码急速下单', 220, 570)

      ctx.drawImage(img, 20, 120)
      
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.download = '二维码.png'
      a.click()
      document.body.removeChild(a)
    }
    img.onerror = (e) => {
      console.error(e)
    }
    img.src = `/api/manager/distributor/qr?d=${id}`
  },
  addDistributor (data: Partial<Distributor>) {
    return http('/api/manager/distributor/add', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
  },
  updateDistributor (data: Distributor) {
    return http('/api/manager/distributor/update', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify(data),
    })
  },
  removeDistributor (id: string) {
    return http('/api/manager/distributor/remove', {
      method: 'POST',
      headers: HEADER_JSON,
      body: JSON.stringify({ id }),
    })
  },
}
