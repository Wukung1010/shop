import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize('shop', 'root', 'P@ssw0rd', {
  host: '124.70.194.78',
  dialect: 'mysql'
})

class Commodity extends Model {}
Commodity.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  price_unit: DataTypes.STRING,
  count: DataTypes.INTEGER
}, { sequelize, modelName: 'commodities', timestamps: false });

export default {
  commodity: {
    all () {
      (async () => {
        await sequelize.sync()
        const data = await Commodity.findAll()
        console.log(data)
      })()
    },
    one () {},
    add () {},
    remove () {},
    update () {},
  }
}
