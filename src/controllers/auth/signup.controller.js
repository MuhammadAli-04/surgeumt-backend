import { DB_TABLE_NAMES } from 'constants/db.constant'
import { APP_ERROR } from 'constants/error.constant'
import { accessType } from 'constants/middleware.constant'
import { createUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { generateAccessToken, generateRefreshToken } from 'utils/jwt.util'

export const signup = catchAsync(async (req, res, next) => {
  const userData = req.body

  const { password, confirmPassword } = userData
  if (!(password === confirmPassword)) {
    return next(new AppError('passwords donot match', 400))
  }

  delete userData.confirmPassword

  const [user, created] = await createUser(userData)

  if (!created) {
    return next(new AppError(APP_ERROR.AUTH.SIGNUP.DUPLICATE_EMAIL, 400))
  }

  const userAttributes = {
    id: user.id,
    type: DB_TABLE_NAMES.USER,
  }

  const accessToken = generateAccessToken({
    ...userAttributes,
    access: [accessType.http, accessType.ws],
  })
  const refreshToken = generateRefreshToken({
    ...userAttributes,
    access: [accessType.refresh],
  })

  delete user.dataValues.password

  return successResponse.sendData(res, {
    message: 'Your account has been created successfully',
    data: {
      user,
      accessToken,
      refreshToken,
    },
  })
})
