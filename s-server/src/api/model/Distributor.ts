import { Sequelize, Model, DataTypes } from 'sequelize'
import type { Distributor as TDistributor } from '../../types' 

const MODEL_NAME = 's_distributor'

const T_Distributor = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: DataTypes.STRING,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  remarks: DataTypes.STRING,
}

class Distributor extends Model {}

export default {
  init (sequelize: Sequelize) {
    return Distributor.init(T_Distributor, { sequelize, modelName: MODEL_NAME, timestamps: true})
  },
  all () {
    return Distributor.findAll()
  },
  one (id: string) {
    return Distributor.findOne({ where: { id }})
  },
  add ({
    code,
    name,
    phone,
    address,
    remarks,
  }: TDistributor) {
    return Distributor.create({
      code,
      name,
      phone,
      address,
      remarks,
    }, { fields: [
      'code',
      'name',
      'phone',
      'address',
      'remarks',
    ]})
  },
  remove (id: string) {
    return Distributor.destroy({ where: { id }})
  },
  update ({
    id,
    name,
    phone,
    address,
    remarks,
  }: TDistributor) {
    return Distributor.update({
      name,
      phone,
      address,
      remarks,
    }, { where: { id }})
  }
}
