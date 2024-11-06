import { APP_ERROR } from 'constants/error.constant'
import { getSingleUser } from 'services/user.service'
import AppError from 'utils/appError.util'

export const PhoneNumberDuplicateValidator = async (req, res, next) => {
  const user = await getSingleUser(
    { phoneNumber: req.body.phoneNumber },
    { paranoid: false }
  )
  if (user) {
    return next(new AppError(APP_ERROR.USER.PHONENUMBER_ALREADY_IN_USE, 403))
  }

  next()
}
