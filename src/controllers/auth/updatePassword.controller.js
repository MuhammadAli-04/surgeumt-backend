import logger from 'configs/logger.config'
import { APP_ERROR } from 'constants/error.constant'
import { getSingleUser, updatePassword } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { compareHash, generateHash } from 'utils/encryption.util'

export const updateUserPassword = catchAsync(async (req, res, next) => {
  const email = req.user.email
  const { oldPassword, newPassword } = req.body

  const user = await getSingleUser(
    { email },
    {
      attributes: {
        include: ['password'],
      },
    }
  )

  logger.info(`${oldPassword} ${user.password}`)

  if (!(await compareHash(oldPassword, user.password))) {
    return next(new AppError(APP_ERROR.AUTH.PASSWORD.INVALID_PASSWORD, 403))
  }

  const [, isUpdated] = await updatePassword(
    email,
    await generateHash(newPassword)
  )
  if (isUpdated) {
    return successResponse.sendMessage(res, {
      message: 'Password updated successfully',
    })
  }
})
