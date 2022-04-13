import { Order } from './../types'
import { Request, Response } from 'express'
import api from '../api'

export async function useOrder (req: Request, res: Response) {
  try {
    const Order = api.Order
    if (req.path.endsWith('/all')) {
      const data = await Order.all()
      res.json(data).end()
    } else if (req.path.endsWith('/add')) {
      const order: Order = req.body
      const data = await Order.add(order)
      await api.User.update({ phone: order.phone, name: order.name, address: order.address, remarks: order.remarks })
      res.json(data).end()
    } else if (req.path.endsWith('/find')) {
      const data = await Order.find(req.body)
      res.json(data).end()
    } else if (req.path.endsWith('/update')) {
      const data = Order.update(req.body)
      res.json(data).end()
    } else if (req.path.endsWith('/remove')) {
      const data = await Order.remove(req.body.id)
      res.json(data).end()
    } else if (req.path.endsWith('/user')) {
      const data = await api.User.one(req.body)
      res.json(data).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
