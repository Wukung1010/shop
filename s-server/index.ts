import express, { Request, Response, NextFunction} from 'express'
import multer from 'multer'
import { useToken, useUser } from './src/user'
import { useCommodity } from './src/commodity'
import { useOrder } from './src/order'
import { useDistributor } from './src/distributor'
import { useSys } from './src/sys'
import { useQR } from './src/qr'
import { useFile } from './src/file'
import api from './src/api'
import { PORT } from './src/config'

try {
  api.init()
} catch (error) {
  console.error(error)
}

const app = express()

app.use((req, res, next) => {
  console.log(req.path)
  if (req.path.startsWith('/api/manager')) {
    useToken(req, res, next)
  } else {
    next()
  }
})

app.use(express.json())

app.use((error: number, req: Request, res: Response, next: NextFunction) => {
  if (error === 401) {
    res.status(401).end()
  } else {
    res.status(500).json({ message: '服务器发生未知错误' }).end()
  }
})

app.use('/manager', express.static('./manager/'))
app.use('/mobile', express.static('./mobile/'))
app.use(express.static('./assets/', {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'no-cache')
  }
}))

app.use('/api/login', useUser)
app.use('/api(/manager)?(/mobile)?/commodity', useCommodity)
app.use('/api(/manager)?(/mobile)?/commodity', useCommodity)
app.use('/api(/manager)?(/mobile)?/order', useOrder)
app.use('/api(/manager)?(/mobile)?/distributor', useDistributor)
app.use('/api(/manager)?(/mobile)?/sys', useSys)
app.use('/api(/manager)?/qr', useQR)
const uploads = multer({ dest: 'uploads/' })
app.use('/api/upload', uploads.single('file'), useFile)
app.use('/api/upload', uploads.single('file'), useFile)

app.listen(PORT)
