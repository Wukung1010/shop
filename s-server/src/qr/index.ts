import { Request, Response } from 'express'
import fs from 'fs'

const logo = './assets/logo.jpg'
const QR = './assets/QR.jpeg'

export function useQR (req: Request, res: Response) {
  if (req.path.endsWith('/logo')) {
    const buffer = fs.readFileSync(logo)
    res.writeHead(200, { 'Content-Type': 'application/png' })
    res.end(buffer)
  } else if (req.path.endsWith('/business')) {
    const buffer = fs.readFileSync(QR)
    res.writeHead(200, { 'Content-Type': 'application/png' })
    res.end(buffer)
  } else if (req.path.endsWith('/uploadLogo')) {
    
  } else if (req.path.endsWith('/uploadBusiness')) {
    
  } else {
    res.status(404).end()
  }
}