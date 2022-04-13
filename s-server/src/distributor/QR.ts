import { AwesomeQR } from 'awesome-qr'
import { readFile } from '../file'

export default async function (msg: string, name: string, phone: string) {
  const logo = await readFile('logo')
  return new AwesomeQR({
    text: msg,
    size: 400,
    logoImage: logo,
  }).draw()
}