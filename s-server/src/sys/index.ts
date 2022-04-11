import { Request, Response } from 'express'
import api from '../api'

export function useSys (req: Request, res: Response) {
  const sys = api.Sys
  if (req.path.endsWith('/all')) {
    sys
      .all()
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else if (req.path.endsWith('/update')) {
    Promise.all([sys.update(req.body), api.Commodity.updateFare(req.body)])
      .then(() => res.json(1).end())
      .catch(() => res.status(500).end())
  } else if (req.path.endsWith('/updateP')) {
    sys
      .updateP(req.body)
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else {
    res.status(404).end()
  }
}
