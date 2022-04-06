import { Request, Response } from 'express'
import api from '../api'

export function useDistributor (req: Request, res: Response) {
  const distributor = api.Distributor
  if (req.path.endsWith('/all')) {
    distributor
      .all()
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else if (req.path.endsWith('/add')) {
    distributor
      .add(req.body)
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else if (req.path.endsWith('/update')) {
    distributor
      .update(req.body)
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else if (req.path.endsWith('/remove')) {
    distributor
      .remove(req.body)
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else {
    res.status(404).end()
  }
}
