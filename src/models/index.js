import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import envConfig from 'configs/env.config'
import logger from 'configs/logger.config'

const basename = path.basename(__filename)
const db = {}

// const caCert =
//   envConfig.SSL_MODE === 'REQUIRED' &&
//   fs.readFileSync(path.resolve(envConfig.CA_CERTIFICATE))

const sequelize = new Sequelize(
  envConfig.DB_NAME,
  envConfig.DB_USER,
  envConfig.DB_PASSWORD,
  {
    host: envConfig.DB_HOST,
    dialect: envConfig.DB_DIALECT,
    dialectOptions:
      envConfig.SSL_MODE === 'REQUIRED'
        ? {
            ssl: {
              rejectUnauthorized: true,
              ca: envConfig.CA_CERTIFICATE,
            },
          }
        : undefined,
    logging: false,
    port: envConfig.DB_PORT,
    define: {
      freezeTableName: true,
    },
  }
)

Promise.all(
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-9) === '.model.js' &&
        file.indexOf('.test.js') === -1
      )
    })
    .map(async (file) => {
      try {
        const module = await import(path.join(__dirname, file))
        const model = module.default(sequelize, Sequelize.DataTypes)
        db[model.name] = model
      } catch (err) {
        logger.error(`getting error in require file model`, err)
      }
    })
)
  .then(() => {
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].options.associate) {
        db[modelName].options.associate(db)
      }
    })
  })
  .then(() => {
    // //parent contains children
    // db[DB_TABLE_NAMES.PARENT].belongsToMany(db[DB_TABLE_NAMES.CHILD], {
    //   foreignKey: 'parentId',
    //   through: DB_TABLE_NAMES.PARENT_CHILD,
    //   onDelete: 'CASCADE',
    // })
    // //child contains parents
    // db[DB_TABLE_NAMES.CHILD].belongsToMany(db[DB_TABLE_NAMES.PARENT], {
    //   through: DB_TABLE_NAMES.PARENT_CHILD,
    //   foreignKey: 'childId',
    //   onDelete: 'CASCADE',
    // })
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
