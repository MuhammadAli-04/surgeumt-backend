import { APP_ERROR } from 'constants/error.constant'
import { accessType } from 'constants/middleware.constant'
import { getSingleUser } from 'services/user.service'
import AppError from 'utils/appError.util'
import { verifyAccessToken } from 'utils/jwt.util'

const { onSocketConnectSchema } = require('schemas/socket.schema')

export const onSocketConnectValidate = async (socket, next) => {
  try {
    const { accesstoken } = socket.handshake.headers
    const { error } = onSocketConnectSchema.validate({
      accessToken: accesstoken,
    })

    if (error) {
      return next(error)
    }

    const { token, error: errorMessage } = verifyAccessToken(accesstoken)

    if (errorMessage) {
      return next(new AppError(errorMessage, 401))
    }

    const user = await getSingleUser({ id: token.user.id })

    if (!user) {
      return next(new AppError(APP_ERROR.NOT_ACCESSIBLE, 401))
    }

    if (!user.access.includes(accessType.ws)) {
      return next(new AppError(APP_ERROR.JWT.INVALID_TOKEN, 400))
    }

    socket.user = user
    socket.type = token.user.type

    next()
  } catch (error) {
    next(error)
  }
}
