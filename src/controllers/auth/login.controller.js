import { DB_TABLE_NAMES } from 'constants/db.constant'
import { APP_ERROR } from 'constants/error.constant'
import { accessType } from 'constants/middleware.constant'
import { getSingleUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { compareHash } from 'utils/encryption.util'
import { generateAccessToken, generateRefreshToken } from 'utils/jwt.util'

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await getSingleUser(
    { email },
    {
      attributes: {
        include: ['password'],
      },
    }
  )

  if (!user) {
    return next(new AppError(APP_ERROR.AUTH.LOGIN.INVALID_CREDENTIALS, 401))
  }

  const isPasswordCorrect = await compareHash(password, user.password)

  if (!isPasswordCorrect) {
    return next(new AppError(APP_ERROR.AUTH.LOGIN.INVALID_CREDENTIALS, 401))
  }

  const userAttributes = {
    id: user.id,
    type: DB_TABLE_NAMES.USER,
  }

  delete user.dataValues.password

  const accessToken = generateAccessToken({
    ...userAttributes,
    access: [accessType.http, accessType.ws],
  })
  const refreshToken = generateRefreshToken({
    ...userAttributes,
    access: [accessType.refresh],
  })

  return successResponse.sendData(res, {
    data: {
      accessToken,
      refreshToken,
    },
  })
})

export default login
