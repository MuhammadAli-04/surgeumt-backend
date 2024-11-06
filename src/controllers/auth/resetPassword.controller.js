import { APP_ERROR } from 'constants/error.constant'
import { updatePassword } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { generateHash } from 'utils/encryption.util'

export const resetPassword = catchAsync(async (req, res, next) => {
  const email = req.user.email
  const { newPassword } = req.body

  const [, isUpdated] = await updatePassword(
    email,
    await generateHash(newPassword)
  )
  if (isUpdated) {
    return successResponse.sendMessage(res, {
      message: 'Password reset successfully',
    })
  }

  next(new AppError(APP_ERROR.USER_NOT_FOUND, 400))
})
