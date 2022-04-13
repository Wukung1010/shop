import fs from 'fs/promises'
import { Request, Response } from 'express'

const DIR = './assets'

export async function readFile (name: string) {
  const files = await fs.readdir(DIR)
  const file = files.find((file) => file.indexOf(name) > -1)
  return fs.readFile(`${DIR}/${file}`)
}

export async function updateFile (name: string, { path }: any) {
  const files = await fs.readdir(DIR)
  const file = files.find((file) => file.indexOf(name) > -1)
  await fs.rm(`${DIR}/${file}`)
  await fs.cp(path, `${DIR}/${file}`)
  return fs.rm(path)
}

export async function useFile (req: Request, res: Response) {
  if (req.file) {
    if (req.path.endsWith('logo')) {
      await updateFile('logo', req.file)
      res.status(200).end()
    } else if (req.path.endsWith('QR')) {
      await updateFile('QR', req.file)
      res.status(200).end(200)
    }
  }
  res.status(404).end()
}
