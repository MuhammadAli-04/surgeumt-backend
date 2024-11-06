import logger from 'configs/logger.config'
import { accessType } from 'constants/middleware.constant'
import { isOtpVerified } from 'services/otp.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'
import { generateAccessToken } from 'utils/jwt.util'

export const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body
  logger.info(`${email} ${otp}`)
  const [status, message] = await isOtpVerified(email, otp)
  if (status) {
    const accessToken = generateAccessToken({
      email: email,
      access: [accessType.otp],
    })
    return successResponse.sendData(res, {
      data: {
        message,
        accessToken,
      },
    })
  }
  next(new AppError(message, 400))
})
