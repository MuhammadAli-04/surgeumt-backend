import { DB_TABLE_NAMES } from 'constants/db.constant'
import { APP_ERROR } from 'constants/error.constant'
import db from 'models'
import { generateOTP } from 'utils/helpers.util'

export const getLatestOtp = async (conditions = {}, options = {}) => {
  return db[DB_TABLE_NAMES.OTP].findOne({ where: conditions, ...options })
}

export const generateNewOtp = async (email) => {
  const data = await db[DB_TABLE_NAMES.OTP].findOne({
    where: {},
    order: [['createdAt', 'DESC']],
  })

  if (data && new Date(data.expiryDatetime) > new Date()) {
    await db[DB_TABLE_NAMES.OTP].update(
      {
        expiryDatetime: Date.now(),
      },
      {
        where: { id: data.id },
        returning: false,
      }
    )
  }

  let otp = generateOTP()
  let [otpData, created] = await db[DB_TABLE_NAMES.OTP].findOrCreate({
    where: { otp },
    defaults: {
      email: email,
      otp: otp,
    },
  })

  while (!created) {
    otp = generateOTP()
    ;[created, otpData] = await db[DB_TABLE_NAMES.OTP].findOrCreate({
      where: { otp },
      defaults: {
        email: email,
        otp: otp,
      },
    })
  }

  return otpData.otp
}

export const isOtpVerified = async (email, otp) => {
  const otpRecord = await db[DB_TABLE_NAMES.OTP].findOne({
    where: { email, otp },
  })
  if (otpRecord) {
    const datetime = Date.now()
    if (otpRecord.consumedAt) {
      return [false, APP_ERROR.AUTH.OTP.ALREADY_USED]
    }

    if (new Date(otpRecord.expiryDatetime) <= datetime) {
      return [false, APP_ERROR.AUTH.OTP.EXPIRED]
    }

    await db[DB_TABLE_NAMES.OTP].update(
      {
        expiryDatetime: datetime,
        consumedAt: datetime,
      },
      {
        where: {
          id: otpRecord.id,
        },
        returning: false,
      }
    )
    return [true, 'Email verified successfully']
  }

  return [false, APP_ERROR.AUTH.OTP.INVALID_OTP]
}
