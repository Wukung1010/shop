import { Request, Response } from 'express'
import api from '../api'

const ErrorHandler = (res: Response) => {
  return (err: Error) => {
    console.log(err)
    res.status(500).end()
  }
}

export function useOrder (req: Request, res: Response) {
  const order = api.Order
  if (req.path.endsWith('/all')) {
    order
      .all()
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/add')) {
    order
      .add(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/find')) {
    order
      .find(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/update')) {
    order
      .update(req.body)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else if (req.path.endsWith('/remove')) {
    order
      .remove(req.body.id)
      .then((data) => res.json(data).end())
      .catch(ErrorHandler(res))
  } else {
    res.status(404).end()
  }
}
