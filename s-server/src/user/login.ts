import { Response, Request } from 'express'
import { setToken, COOKIE } from './token'

function check ({ user, password }: { user: string; password: string; }) {
  return user === 'admin' && password === '123'
}

export function useUser (req: Request, res: Response) {
  if (check(req.body)) {
    setToken(req.body.user)
      .then((data) => {
        res.setHeader('set-cookie', `${COOKIE}=${data}`)
        res.json({
          success: true,
          user: req.body.user,
        })
      })
  } else {
    res.json({ success: false }).end()
  }
}
