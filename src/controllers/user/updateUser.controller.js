import { APP_ERROR } from 'constants/error.constant'
import { checkPhoneNumberAvailability } from 'services'
import { updateUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'
import AppError from 'utils/appError.util'

export const updateUserData = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const userData = req.body

  const { onboardingStatus, phoneNumber: newPhoneNumber } = userData

  const user = req.user

  const { id: userId, email, password, phoneNumber: currentPhoneNumber } = user

  userData.middleName =
    userData.middleName && userData.middleName.length
      ? userData.middleName
      : null

  if (String(userId) !== id) {
    return next(new AppError(APP_ERROR.USER.INVALID_UPDATE_REQUEST, 400))
  }

  if (
    newPhoneNumber &&
    currentPhoneNumber !== newPhoneNumber &&
    !(await checkPhoneNumberAvailability(newPhoneNumber))
  ) {
    return next(new AppError(APP_ERROR.CHILD.PHONENUMBER_ALREADY_IN_USE, 400))
  }

  if (userData.avatar !== undefined) {
    userData.avatar = userData.avatar.length ? userData.avatar : null
  }

  await updateUser(
    {
      id,
      ...userData,
      email,
      password,
      ...(onboardingStatus && { onboardingStatus }),
    },
    req.avatarUpdated
  )

  successResponse.sendMessage(res, { message: 'User updated successfully' })
})
