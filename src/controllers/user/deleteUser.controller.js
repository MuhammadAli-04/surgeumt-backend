import { APP_ERROR } from 'constants/error.constant'
import { destroyUser, getSingleUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { compareHash } from 'utils/encryption.util'

export const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id

  const { password } = req.body

  const user = await getSingleUser(
    { id },
    {
      attributes: {
        include: ['password'],
      },
    }
  )

  if (!user) {
    next(new AppError(APP_ERROR.USER_NOT_FOUND, 404))
    return
  }

  if (!(await compareHash(password, user.password))) {
    return next(new AppError(APP_ERROR.AUTH.LOGIN.INVALID_CREDENTIALS, 400))
  }

  if (await destroyUser(id)) {
    return successResponse.sendMessage(res, {
      message: 'User deleted successfully',
    })
  }
})
