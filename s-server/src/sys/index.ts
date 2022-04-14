import { Request, Response } from 'express'
import api from '../api'

export async function useSys (req: Request, res: Response) {
  const sys = api.Sys
  try {
    if (req.path.endsWith('/all')) {
      const data = await sys.all()
      res.json(data).end()
    } else if (req.path.endsWith('/updateFare')) {
      await Promise.all([sys.updateFare(req.body.fare), api.Commodity.updateFare(req.body.fare)])
      res.json(1).end()
    } else if (req.path.endsWith('/updatePhone')) {
      await sys.updatePhone(req.body.phone)
      res.json(1).end()
    } else if (req.path.endsWith('/updateP')) {
      const data = await sys.updateP(req.body)
      res.json(data).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
