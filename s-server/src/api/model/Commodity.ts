import { Sequelize, Model, DataTypes, Op } from 'sequelize'
import { getCode } from '../DB'
import type { Commodity as TCommodity, Sys } from '../../types'

const MODEL_NAME = 's_commodities'

class Commodity extends Model {}

const T_Commodity = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: DataTypes.STRING,
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  priceUnit: DataTypes.STRING,
  fare: DataTypes.FLOAT,
  count: DataTypes.INTEGER,
}

export default {
  init (sequelize: Sequelize) {
    return Commodity.init(T_Commodity, { sequelize, modelName: MODEL_NAME, timestamps: true })
  },
  all () {
    return Commodity.findAll({ order: [['updatedAt', 'DESC']] })
  },
  one (id: number) {
    return Commodity.findOne({ where: { id }})
  },
  find (title: string) {
    return Commodity.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      order: [['updatedAt', 'DESC']],
    })
  },
  add ({
    title,
    price,
    priceUnit,
    fare,
    count,
  }: TCommodity) {
    return Commodity.create({
      code: getCode(),
      title,
      price,
      priceUnit,
      fare,
      count,
    }, { fields: ['code', 'title', 'price', 'priceUnit', 'fare', 'count']})
  },
  remove (id: number) {
    return Commodity.destroy({ where: { id }})
  },
  update ({
    id,
    title,
    price,
    priceUnit,
    fare,
    count,
  }: TCommodity) {
    return Commodity.update({
        title,
        price,
        priceUnit,
        fare,
        count,
      }, { where: { id }})
  },
  updateFare (fare: number) {
    return Commodity.update({ fare }, { where: {}})
  },
}
