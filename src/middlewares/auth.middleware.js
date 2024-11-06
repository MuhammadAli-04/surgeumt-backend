import { APP_ERROR } from 'constants/error.constant'
import { accessType, requestType } from 'constants/middleware.constant'
import { getSingleUser } from 'services/user.service'
import AppError from 'utils/appError.util'
import {
  getBearerTokenFromHeader,
  verifyAccessToken,
  verifyRefreshToken,
} from 'utils/jwt.util'

export const refreshTokenValidator = async (req, res, next) => {
  const refreshToken = getBearerTokenFromHeader(req.headers)
  if (!refreshToken) {
    return next(APP_ERROR.JWT.TOKEN_MISSING, 400)
  }

  const result = verifyRefreshToken(refreshToken)
  if (!result.success || !result.token) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  if (!result.token.user.access.includes(accessType.refresh)) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }
  req.user = result.token.user
  req.refreshToken = refreshToken

  next()
}

export const signupDuplicateValidator = async (req, res, next) => {
  const { email } = req.body
  const user = await getSingleUser({ email }, { paranoid: false })
  if (user) {
    return next(new AppError(APP_ERROR.AUTH.SIGNUP.DUPLICATE_EMAIL, 400))
  }

  next()
}

export const signupDuplicateValidatorBeforeSendOtp = async (req, res, next) => {
  const { email, type } = req.body
  if (type === requestType.FORGOT_PASSWORD) {
    return next()
  }
  const user = await getSingleUser({ email }, { paranoid: false })
  if (user) {
    return next(new AppError(APP_ERROR.AUTH.SIGNUP.DUPLICATE_EMAIL, 400))
  }

  next()
}

export const verifyTokenBeforeSignup = async (req, res, next) => {
  const accessToken = getBearerTokenFromHeader(req.headers)
  if (!accessToken) {
    return next(APP_ERROR.JWT.TOKEN_MISSING, 400)
  }

  const result = verifyAccessToken(accessToken)

  if (!result.success || !result.token) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  if (!result.token.user || result.token.user.email !== req.body.email) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  if (!result.token.user.access.includes(accessType.otp)) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  req.user = result.token.user

  next()
}

export const verifyTokenBeforeResetPassword = async (req, res, next) => {
  const accessToken = getBearerTokenFromHeader(req.headers)
  if (!accessToken) {
    return next(APP_ERROR.JWT.TOKEN_MISSING, 400)
  }

  const result = verifyAccessToken(accessToken)

  if (!result.success || !result.token) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  if (!result.token.user.access.includes(accessType.otp)) {
    return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
  }

  req.user = result.token.user

  next()
}
