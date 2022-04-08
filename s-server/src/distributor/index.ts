import { Request, Response } from 'express'
import QR from './QR'
import api from '../api'

const ErrorHandler = (res: Response) => {
  return (err: Error) => {
    console.log(err)
    res.status(500).end()
  }
}

export function useDistributor (req: Request, res: Response) {
  const distributor = api.Distributor
  if (req.path.endsWith('/all')) {
    distributor
      .all()
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/add')) {
    distributor
      .add(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/update')) {
    distributor
      .update(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/remove')) {
    distributor
      .remove(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/qr')) {
    distributor
      .one(req.query.d as any)
      .then((data) => {
        if (data) {
          const msg = `http://124.70.194.78:3000/mobile?id=${(data as any).id}`
          const name = (data as any).name
          const phone = (data as any).phone
          QR(msg, name, phone).then((val) => {
            res.writeHead(200, { 'Content-Type': 'application/png' })
            res.end(val as any)
          })
        } else {
          res.status(500).json({ error: 'distributor not found'}).end()
        }
      })
  } else {
    res.status(404).end()
  }
}
