import token from 'jsonwebtoken'
import envConfig from 'configs/env.config'
import { ENV } from 'constants/app.constant'

const getAccessTokenExpiry = () =>
  envConfig.NODE_ENV === ENV.DEV ? '1d' : envConfig.JWT_ACCESS_TOKEN_EXPIRY

const getRefreshTokenExpiry = () =>
  envConfig.NODE_ENV === ENV.DEV ? '7d' : envConfig.JWT_REFRESH_TOKEN_EXPIRY

export const generateAccessToken = (user, expiresIn = getAccessTokenExpiry()) =>
  token.sign({ user }, envConfig.JWT_ACCESS_SECRET_KEY, { expiresIn })

export const generateSocketAccessToken = (user) =>
  token.sign({ user }, envConfig.JWT_ACCESS_SECRET_KEY)

export const generateRefreshToken = (
  user,
  expiresIn = getRefreshTokenExpiry()
) => token.sign({ user }, envConfig.JWT_REFRESH_SECRET_KEY, { expiresIn })

export const verifyAccessToken = (accessToken) => {
  try {
    const verifiedToken = token.verify(
      accessToken,
      envConfig.JWT_ACCESS_SECRET_KEY
    )
    return { success: true, token: verifiedToken }
  } catch (error) {
    return { success: false, token: null, error: error.message }
  }
}

export const verifyRefreshToken = (refreshToken) => {
  try {
    const verifiedToken = token.verify(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET_KEY
    )
    return { success: true, token: verifiedToken }
  } catch (error) {
    return { success: false, token: null, error: error.message }
  }
}

export const decodeAccessOrRefreshToken = (token) => {
  try {
    return token.decode(token, { complete: true })
  } catch (error) {
    return null
  }
}

export const getBearerTokenFromHeader = (headers) => {
  if (!headers.authorization) {
    return null
  }
  const bearer = headers.authorization.split(' ')
  if (bearer.length === 2 && bearer[0]?.toLowerCase() === 'bearer') {
    return bearer[1]
  }
  return null
}
