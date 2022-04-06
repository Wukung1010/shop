import { Commodity as TCommodity } from '../../types'
import Commodity from '../src/api/model/Commodity'
import DB from '../src/api/DB'

const commodity: TCommodity = {
  id: 0,
  code: '',
  title: '测试商品',
  price: 12.21,
  priceUnit: '袋',
  fare: 1.22,
  count: 1000,
}

beforeAll(async () => {
  Commodity.init(DB)
  await DB.sync()
})

afterAll(async () => {
  await DB.close()
})

test('订单测试', async () => {

  await test('添加商品', async () => {
    const data = await Commodity.add(commodity)
    const { id, code, title, price, priceUnit, fare, count } = (data as any as TCommodity)
    commodity.id = id
    expect({
      code,
      title,
      price,
      priceUnit,
      fare,
      count,
    }).toEqual({
      code: commodity.code,
      title: commodity.title,
      price: commodity.price,
      priceUnit: commodity.priceUnit,
      fare: commodity.fare,
      count: commodity.count,
    })
  })

  await test('更新商品', async () => {
    const newCommodity = { ...commodity, title: '测试修改的商品' }
    const data = await Commodity.update(newCommodity)
    expect((data as any as TCommodity).title).toBe('测试修改的商品')
  })
  
  await test('查询商品', async () => {
    const data = await Commodity.one(commodity.id)
    expect((data as any as TCommodity).title).toBe('测试修改的商品')
  })
  
  await test('删除商品', async () => {
    const data = await Commodity.remove(commodity.id)
    expect((data as any as TCommodity).title).toBe('测试修改的商品')
  })
})
