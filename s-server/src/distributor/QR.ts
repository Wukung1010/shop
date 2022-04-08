import { AwesomeQR } from 'awesome-qr'
import fs from 'fs'
import path from 'path'

export default function (msg: string, name: string, phone: string) {
  const logo = fs.readFileSync(path.resolve(__dirname, '../../assets/logo.jpg'))
  return new AwesomeQR({
    text: msg,
    size: 400,
    logoImage: logo,
  }).draw()
}