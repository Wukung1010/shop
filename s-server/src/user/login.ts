import { Response, Request } from 'express'
import { setToken, COOKIE } from './token'
import api from '../api'

async function check ({ user, password }: { user: string; password: string; }) {
  return await api.Sys.checkP(user, password)
}

export async function useUser (req: Request, res: Response) {
  if (await check(req.body)) {
    const data = await setToken(req.body.user)
    res.setHeader('set-cookie', `${COOKIE}=${data}`)
    res.json({
      success: true,
      user: req.body.user,
    })
  } else {
    res.json({ success: false }).end()
  }
}
