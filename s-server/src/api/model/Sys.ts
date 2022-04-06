import { Sequelize, Model, DataTypes } from 'sequelize'
import type { Sys as TSys } from '../../types' 

const MODEL_NAME = 's_sys'

const T_Sys = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dPriceUnit: DataTypes.STRING,
  dFare: DataTypes.INTEGER,
}

class Sys extends Model {}

export default {
  init (sequelize: Sequelize) {
    return Sys.init(T_Sys, { sequelize, modelName: MODEL_NAME, timestamps: false})
  },
  all () {
    return Sys.findAll()
  },
  update ({
    dPriceUnit,
    dFare,
  }: TSys) {
    return Sys.update({
      dPriceUnit,
      dFare,
    }, { where: { id: 0 }})
  }
}
