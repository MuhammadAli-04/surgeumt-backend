import { getSingleUser } from './user.service'

export const checkPhoneNumberAvailability = async (phoneNumber) => {
  const user = await getSingleUser({ phoneNumber })
  if (user) {
    return false
  }

  return true
}
