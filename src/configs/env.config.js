import path from 'path'
import * as dotenv from 'dotenv'
import logger from 'configs/logger.config'

function assertEnvVarsExist(envVars) {
  const errors = envVars.filter((e) => !process.env[e])
  if (errors.length > 0) {
    for (const e of errors) {
      // eslint-disable-next-line no-console
      logger.error(`You need to set a ${e} in your .env file`)
    }

    throw new Error(
      `Terminating due to ${errors.length} error${
        errors.length > 1 ? 's' : ''
      }.`
    )
  }
}

dotenv.config({
  path: path.join(__dirname, '../../.env'),
})

assertEnvVarsExist(['NODE_ENV', 'PORT'])

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_PORT: process.env.DB_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SERVICE: process.env.SMTP_SERVICE,
  OTP_EXPIRY_TIME: process.env.OTP_EXPIRY_TIME,
  FIREBASE_SERVICE_CONFIG: process.env.FIREBASE_SERVICE_CONFIG,
  SSL_MODE: process.env.SSL_MODE ?? '',
  CA_CERTIFICATE: process.env.CA_CERTIFICATE ?? '',
}
