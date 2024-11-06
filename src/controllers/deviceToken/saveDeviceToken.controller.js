import { APP_ERROR } from 'constants/error.constant'
import { storeDeviceToken } from 'services/deviceToken.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'

export const saveDeviceToken = catchAsync(async (req, res, next) => {
  const data = req.body
  const { id } = req.user

  const result = await storeDeviceToken({ ...data, userId: id })
  if (result) {
    return successResponse.sendMessage(res, {
      message: 'Device Token saved successfully',
    })
  }

  return next(new AppError(APP_ERROR.SERVER_ERROR, 500))
})
