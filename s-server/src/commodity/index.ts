import { Request, Response } from 'express'
import api from '../api'

export function useCommodity (req: Request, res: Response) {
  const commodity = api.Commodity
  if (req.path.endsWith('/all')) {
    commodity
      .all()
      .then((data) => res.json(data).end())
      .catch((error) => (console.log(error), res.status(500).end()))
  } else if (req.path.endsWith('/find')) {
    commodity
      .find(req.body.title)
      .then((data) => res.json(data).end())
      .catch((error) => (console.log(error), res.status(500).end()))
  } else if (req.path.endsWith('/add')) {
    commodity
      .add(req.body)
      .then((data) => res.json(data).end())
      .catch((error) => (console.log(error), res.status(500).end()))
  } else if (req.path.endsWith('/update')) {
    commodity
      .update(req.body)
      .then(() => {
        commodity.one(req.body.id).then((data) => res.json(data).end())
      })
      .catch((error) => (console.log(error), res.status(500).end()))
  } else if (req.path.endsWith('/remove')) {
    commodity
      .remove(req.body.id)
      .then((data) => res.json(data).end())
      .catch((error) => (console.log(error), res.status(500).end()))
  } else {
    res.status(404).end()
  }
}
