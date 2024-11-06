import passport from 'passport'
import { APP_ERROR } from 'constants/error.constant'
import { getSingleUser } from 'services/user.service'
import AppError from 'utils/appError.util'

export const tokenValidator = (req, res, next, accessType = 'http') => {
  passport.authenticate('jwt', async (err, data) => {
    if (!data) {
      return next(new AppError(APP_ERROR.JWT.UN_AUTHORIZED, 401))
    }

    const { user, type, access } = data
    if (err || !user) {
      return next(new AppError(APP_ERROR.JWT.UN_AUTHORIZED, 401))
    }

    if (!access.includes(accessType)) {
      return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
    }

    if (user.deletedAt) {
      return next(new AppError(APP_ERROR.FORBIDDEN, 403))
    }

    req.user = user
    req.type = type

    next()
  })(req, res, next)
}

// export const allowParentOnly = (req, res, next) => {
//   const type = req.type

//   if (type !== DB_TABLE_NAMES.PARENT) {
//     return next(new AppError(APP_ERROR.NOT_ACCESSIBLE, 403))
//   }

//   next()
// }

export const phoneNoSignupDuplicateValidator = async (req, res, next) => {
  const { phoneNumber } = req.body

  const user = await getSingleUser({ phoneNumber }, { paranoid: false })
  if (user) {
    return next(new AppError(APP_ERROR.CHILD.PHONENUMBER_ALREADY_IN_USE, 400))
  }

  next()
}
