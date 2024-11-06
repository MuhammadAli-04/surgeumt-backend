import { getUserByPk } from 'services/user.service'
import { successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'

export const getUser = async (req, res, next) => {
  const { id } = req.params
  const user = await getUserByPk(id)
  if (user) {
    return successResponse.sendData(res, {
      data: {
        message: 'User found successfully',
        data: user,
      },
    })
  }

  next(new AppError('User not found', 404))
}
