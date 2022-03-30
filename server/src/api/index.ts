import { CommodityInfo } from '../types'
import mysql from 'mysql2'

function query (sql: string) {
  const connection = mysql.createConnection({
    host: '124.70.194.78',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'shop',
  })

  return new Promise((r, j) => {
    connection.query(sql, (error, resluts) => {
      connection.end()
      console.log(resluts)
      if (error) j(error)
      else r(resluts) 
    })
  }) 
}

export default {
  getAllCommodity: () => query('select * from commodities;'),
  getCommodity:(id: number) => query(`select * from commodities where id=${mysql.escape(id)};`),
  updateCommodity: (data: CommodityInfo) => query(
    `update commodities set 
      title=${mysql.escape(data.title)}, 
      price=${mysql.escape(data.price)}, 
      priceUnit=${mysql.escape(data.priceUnit)}, 
      count=${mysql.escape(data.count)} 
      where id=${mysql.escape(data.id)};`
  ),
  addCommodity: (data: CommodityInfo) => query(
    `insert into commodities (\`title\`, \`price\`, \`price\`Unit, \`count\`)
      values (
        ${mysql.escape(data.title)}, 
        ${mysql.escape(data.price)}, 
        ${mysql.escape(data.priceUnit)}, 
        ${mysql.escape(data.count)});`
  ),
  removeCommodity: (id: number) => query(`delete from commodities where id=${mysql.escape(id)}`),
}
