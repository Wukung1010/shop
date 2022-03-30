import express from 'express'
import api from './api'
import { OrderInfo } from './types'

const orderMap = new Map<String, OrderInfo>()
const userOrderMap = new Map<String, Set<String>>()

const app = express()

app.use(express.json())

app.use('/commodityList', (req, res) => {
  api.getAllCommodity().then((data) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
    res.end()
  })
})

app.use('/commodity', (req, res) => {
  api.getCommodity(req.body).then((data) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data)
    res.end()
  })
})

app.use('/order', (req, res) => {
  const phone = req.body.phone
  const arr = userOrderMap.get(phone)
  const result: OrderInfo[] = []
  console.log(arr)
  if (arr && arr.size > 0) {
    arr.forEach((id) => {
      const order = orderMap.get(id)
      if (order) {
        result.push(order)
      }
    })
  }
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(result)
  res.end()
})

app.use('/changeOrder', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json([]).end()
})

app.use('/submitOrder', (req, res) => {
  const order = req.body
  orderMap.set(order.id, order)
  let arr = userOrderMap.get(order.userInfo.phone)
  if (!arr) {
    arr = new Set()
  }
  arr.add(order.id)
  userOrderMap.set(order.userInfo.phone, arr)
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({ success: true }).end()
})

app.use('/test', (req, res) => {
  res.send('test success')
})

app.listen(9999)
