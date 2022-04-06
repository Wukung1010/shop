import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const SINGLE_KEY = 'sun-xianfeng-shop-simidass'
export const COOKIE = 'shop-s-token'

export function setToken (name: string) {
  return new Promise((res) => {
    const token = jwt.sign({
      name,
    }, SINGLE_KEY, { expiresIn: '1h' })
    res(token)
  })
}

function checkToken (token: string) {
  return new Promise((res) => {
    const info = jwt.verify(token, SINGLE_KEY)
    res(info)
  })
}

export function useToken (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.cookie ? req.headers.cookie.substring(COOKIE.length + 1) : undefined;// shop-s-token=
  if (token === undefined) {
    return next(401)
  } else {
    checkToken(token)
      .then(() => {
        return next()
      })
      .catch((error) => {
        return next(401)
      })
  }
}
