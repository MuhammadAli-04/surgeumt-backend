import { APP_ERROR } from 'constants/error.constant'
import { deleteDeviceToken } from 'services/deviceToken.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'

export const removeDeviceToken = catchAsync(async (req, res, next) => {
  const { deviceToken, userId } = req.body

  if (req.user.id !== userId) {
    return next(AppError(APP_ERROR.USER.INVALID_UPDATE_REQUEST, 400))
  }

  const result = await deleteDeviceToken({ deviceToken, userId })
  if (result) {
    return successResponse.sendMessage(res, {
      message: 'Device Token deleted successfully',
    })
  }

  next(new AppError(APP_ERROR.NOT_FOUND, 404))
})
