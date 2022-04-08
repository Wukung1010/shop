import { Request, Response } from 'express'
import api from '../api'

const ErrorHandler = (res: Response) => {
  return (err: Error) => {
    console.log(err)
    res.status(500).end()
  }
}

export function useCommodity (req: Request, res: Response) {
  const commodity = api.Commodity
  if (req.path.endsWith('/all')) {
    commodity
      .all()
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/find')) {
    commodity
      .find(req.body.title)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/add')) {
    commodity
      .add(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/update')) {
    commodity
      .update(req.body)
      .then(() => {
        commodity.one(req.body.id).then((data) => res.json(data).end())
      })
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/remove')) {
    commodity
      .remove(req.body.id)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else {
    res.status(404).end()
  }
}
