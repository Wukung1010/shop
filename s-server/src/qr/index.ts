import { Request, Response } from 'express'
import { readFile } from '../file'

export async function useQR (req: Request, res: Response) {
  if (req.path.endsWith('/logo')) {
    const buffer = await readFile('logo')
    res.writeHead(200, { 'Content-Type': 'application/png' })
    res.end(buffer)
  } else if (req.path.endsWith('/business')) {
    const buffer = await readFile('QR')
    res.writeHead(200, { 'Content-Type': 'application/png' })
    res.end(buffer)
  } else if (req.path.endsWith('/uploadLogo')) {
    
  } else if (req.path.endsWith('/uploadBusiness')) {
    
  } else {
    res.status(404).end()
  }
}