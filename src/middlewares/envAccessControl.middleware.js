import config from 'configs/env.config'
import { APP_ERROR } from 'constants/error.constant'
import AppError from 'utils/appError.util'

const envAccessControl =
  (requiredEnv = []) =>
  (req, res, next) => {
    if (!requiredEnv.includes(config.NODE_ENV)) {
      return next(new AppError(APP_ERROR.API_NOT_FOUND, 400))
    }
    next()
  }

export default envAccessControl
