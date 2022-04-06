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
    sys
      .update(req.body)
      .then((data) => res.json(data).end())
      .catch(() => res.status(500).end())
  } else {
    res.status(404).end()
  }
}
