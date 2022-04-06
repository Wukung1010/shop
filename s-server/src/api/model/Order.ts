import { Sequelize, Model, DataTypes } from 'sequelize'
import type { Order as TOrder } from '../../types' 

const MODEL_NAME = 's_orders'

const T_Order = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: DataTypes.STRING,
  state: DataTypes.INTEGER,
  distributor: DataTypes.INTEGER,
  phone: DataTypes.STRING,
  farePrice: DataTypes.FLOAT,
  commoditiesPrice: DataTypes.FLOAT,
  total: DataTypes.FLOAT,
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  remarks: DataTypes.STRING,
  commodities: DataTypes.TEXT,
}

class Order extends Model {}

function formatCommodities (order: TOrder[]) {
  order.forEach((item) => item.commodities = JSON.parse(item.commodities as any))
  return order
}

export default {
  init (sequelize: Sequelize) {
    return Order.init(T_Order, { sequelize, modelName: MODEL_NAME, timestamps: true})
  },
  all () {
    return Order.findAll({ order: [['updatedAt', 'DESC']] }).then((data) => formatCommodities(data as any))
  },
  one (id: string) {
    return Order.findOne({ where: { id }}).then((data) => formatCommodities(data as any))
  },
  find (options: any) {
    return Order.findAll({ where: options, order: [['updatedAt', 'DESC']]  }).then((data) => formatCommodities(data as any))
  },
  add ({
    code,
    state, 
    distributor,
    phone,
    farePrice,
    commoditiesPrice,
    total,
    name,
    address,
    remarks,
    commodities,
  }: TOrder) {
    return Order.create({
      code,
      state,
      distributor,
      phone,
      farePrice,
      commoditiesPrice,
      total,
      name,
      address,
      remarks,
      commodities: JSON.stringify(commodities),
    }, { fields: [
      'code',
      'state', 
      'distributor',
      'phone',
      'farePrice',
      'commoditiesPrice',
      'total',
      'name',
      'address',
      'remarks',
      'commodities',
    ]})
  },
  remove (id: string) {
    return Order.destroy({ where: { id }})
  },
  update ({
    id,
    state, 
  }: TOrder) {
    return Order.update({
      state,
    }, { where: { id }})
  }
}
