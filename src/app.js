// import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import config from 'configs/env.config'
import passport from 'configs/passport.config'
import { ENV } from 'constants/app.constant'
import { APP_ERROR } from 'constants/error.constant'
import appErrorHandler from 'middlewares/appErrorHandler.middleware'
import routes from 'routes'
import AppError from 'utils/appError.util'

const app = express()

// app.use(cors())

if (config.NODE_ENV === ENV.PROD) {
  app.use(helmet())
  app.use(morgan('tiny'))
} else {
  app.use(morgan('dev'))
}

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(passport.initialize())

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// })

// app.use('/api', limiter, routes)
app.use('/api', routes)

app.all('*', (req, res, next) => {
  return next(new AppError(APP_ERROR.API_NOT_FOUND, 404))
})

app.use(appErrorHandler)

export default app
