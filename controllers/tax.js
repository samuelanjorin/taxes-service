/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import service from '../services/tax'
import asyncF from '../middlewares/async'
import globalFunc from '../utils/globalfunc'
import constants from '../constants/index'
import cache from '../utils/cache'

let field = 'tax_id'
function getTaxes () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if(value !== null){
      return res.json(value.data).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    let taxes = await service.getTaxes()
    if (isEmpty(taxes)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field
      })
    }
    cache.addToCache(req.originalUrl, {data: taxes}, constants.CACHE_TYPES.hour)
    return res.json(taxes).status(constants.NETWORK_CODES.HTTP_SUCCESS)
 
  })
}

 function getTaxById () {
  return asyncF(async (req, res) => {
    let value = await cache.checkCache(req.originalUrl)
    if(value !== null){
      return res.json(value).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    const { tax_id } = req.params;
    const parsedId = parseInt(tax_id, 10);
    if (!isNaN(parsedId)) {
      let tax = await service.getTaxById( parsedId)
    if (isEmpty(tax)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_02),
        message: constants.ERROR_CODES.USR_02,
        field,
        status:constants.NETWORK_CODES.HTTP_BAD_REQUEST
      })
    }
    
   cache.addToCache(req.originalUrl, tax, constants.CACHE_TYPES.hour)
  return res.json(tax).status(constants.NETWORK_CODES.HTTP_SUCCESS)

   }
   return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
    code: globalFunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.USR_09),
    message: constants.ERROR_CODES.USR_09,
    field
  })
  })

}
export default {
  getTaxes,
  getTaxById
}
