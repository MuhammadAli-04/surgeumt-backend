import { accessType } from 'constants/middleware.constant'
import { successResponse } from 'utils/apis.util'
import { generateAccessToken, generateRefreshToken } from 'utils/jwt.util'

export const issueNewAccessToken = (req, res) => {
  const userAttributes = { id: req.user.id, type: req.user.type }
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
}
