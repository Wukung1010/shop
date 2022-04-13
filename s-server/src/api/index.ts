import Sys from './model/Sys'
import Commodity from './model/Commodity'
import Distributor from './model/Distributor'
import Order from './model/Order'
import User from './model/User'
import DB from './DB'

export default {
  init () {
    Sys.init(DB)
    Commodity.init(DB)
    Distributor.init(DB)
    Order.init(DB)
    User.init(DB)
    return DB.sync()
  },
  User,
  Sys,
  Commodity,
  Distributor,
  Order
}
