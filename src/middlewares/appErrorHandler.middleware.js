import config from 'configs/env.config'
import { ENV } from 'constants/app.constant'
import { APP_ERROR } from 'constants/error.constant'
import AppError from 'utils/appError.util'

const handleJWTError = () => new AppError(APP_ERROR.JWT.INVALID_TOKEN, 401)

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // error: err,
      stack: err.stack,
    })
  }

  return res.status(err.statusCode).render('error', {
    status: err?.status || 'error',
    message: APP_ERROR.SERVER_ERROR,
  })
}

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    return res.status(500).json({
      status: 'error',
      message: APP_ERROR.SERVER_ERROR,
    })
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }

  return res.status(err.statusCode).render('error', {
    status: 'error',
    message: APP_ERROR.SERVER_ERROR,
  })
}

const appErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (config.NODE_ENV === ENV.DEV || config.NODE_ENV === ENV.STAGE) {
    sendErrorDev(err, req, res)
  } else if (config.NODE_ENV === ENV.PROD) {
    let error = { ...err }
    error.message = err.message

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError()
    }

    sendErrorProd(error, req, res)

    next()
  }
}

export default appErrorHandler
