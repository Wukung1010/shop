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
  n: DataTypes.STRING,
  p: DataTypes.STRING,
}

class Sys extends Model {}

export default {
  init (sequelize: Sequelize) {
    Sys.init(T_Sys, { sequelize, modelName: MODEL_NAME, timestamps: false})
    return Sys
      .count()
      .then((count) => {
        if (count === 0) {
          Sys.create({ dPriceUnit: '袋', dFare: 0, n: 'admin', p: '123456' })
        }
        return Sys
      })
  },
  all () {
    return Sys.findAll()
  },
  update ({ dPriceUnit, dFare }: TSys) {
    return Sys
      .update({ dPriceUnit, dFare }, { where: {}})
      .then(([count]) => count > 0)
  },
  checkP (n: string, p: string) {
    return Sys
      .count({ where: { n, p }})
      .then((count) => count === 1)
  },
  updateP ({ op, np }: { op: string, np: string }) {
    return Sys
      .update({ p: np }, { where: { p: op }})
      .then(([count]) => count > 0)
  },
}
