import { Sequelize, Model, DataTypes } from 'sequelize'
import type { Address } from '../../types'

const MODEL_NAME = 's_users'

const T_User = {
  phone: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  remarks: DataTypes.STRING,
}

class User extends Model {}

export default {
  init (sequelize: Sequelize) {
    return User.init(T_User, { sequelize, modelName: MODEL_NAME, timestamps: true})
  },
  one ({ phone }: { phone: string }) {
    return User.findOne({ where: { phone }})
  },
  update ({ phone, name, address, remarks }: Address) {
    return User.upsert({
      phone, name, address, remarks
    })
  }
}
