import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
}

winston.addColors(customColors)

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`
  })
)

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
  })
)

const createTransport = (level, filename) =>
  new DailyRotateFile({
    filename: path.join(__dirname, `../../logs/${filename}-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '15d',
    level,
    format: fileFormat,
  })

const logger = winston.createLogger({
  level: 'debug',
  format: fileFormat,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    createTransport('debug', 'log'),
    createTransport('error', 'error'),
  ],
})

export default logger
