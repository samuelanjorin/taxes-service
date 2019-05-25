/* eslint-disable camelcase */
import db from '../models/index'
import redisCache from '../utils/cache'

redisCache.addToCache()

const { tax } = db

async function getTaxById (id) {
  return await findOne( { 
    where: {
      tax_id: id
     }
  }
)
}
 async function getTaxes() {
  return await tax.findAll()
}





export default {
  getTaxes,
  getTaxById
}
