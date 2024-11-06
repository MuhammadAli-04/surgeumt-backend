import http from 'http'
import app from 'app'
import config from 'configs/env.config'
import logger from 'configs/logger.config'
import db from 'models'
import { socketServer } from 'realtime_server'

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  logger.error(`Error Name: ${err.name}, Error Message: ${err.message}`)
  process.exit(1)
})

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('👍 Database connection has been established successfully')
    db.sequelize
      .sync()
      .then(() => {
        logger.info('👍 Database tables have been synced successfully')
      })
      .catch((err) => {
        logger.error('💥 Database tables could not be synced')
        logger.error(`Error Name: ${err.name}, Error Message: ${err.message}`)
        process.exit(1)
      })
  })
  .catch((err) => {
    logger.error('💥 Database connection could not be established')
    logger.error(`Error Name: ${err.name}, Error Message: ${err.message}`)
    process.exit(1)
  })
const server = http.createServer(app)
socketServer(server)
server.listen(config.PORT, () => {
  logger.info(`App is running on port ${config.PORT}`)
})

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...')
  logger.error(`Error Name: ${err.name}, Error Message: ${err.message}`)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  logger.error('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    logger.error('💥 Process terminated!')
  })
})
