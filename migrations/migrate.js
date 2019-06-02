import sequelize from '../config/database'
import fs from 'fs'
import path from 'path'
import logger from '../utils/errors/errorlogger';


const dir = path.join(__dirname, './db.sql')
const dir2 = path.join(__dirname, './insertRecords.sql')
const createTableSql = fs.readFileSync(dir).toString()
const insertTableSql = fs.readFileSync(dir2).toString()
sequelize.query(createTableSql, { raw: true }).then(() => {
  sequelize.query(insertTableSql, {raw: true}).then(()=>{
    console.log('migration successful')
  }).catch(error => {
    logger.error('Error-Inserting Records', error)
  })
}).catch(error => {
  logger.error('Error- Creating Table', error)
})
