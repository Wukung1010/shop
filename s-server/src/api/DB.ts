import { Sequelize } from 'sequelize'
import { M_HOST, M_DATABASE, M_USER, M_PASSWORD } from '../config'

const sequelize = new Sequelize(M_DATABASE, M_USER, M_PASSWORD, {
  host: M_HOST,
  dialect: 'mysql',
})

export function getCode () {
  return `0000${Date.now()}`
}

export default sequelize
