import { Op } from 'sequelize'

const { DB_TABLE_NAMES } = require('constants/db.constant')
const { default: db } = require('models')

export const storeDeviceToken = async (data) => {
  const [deviceToken, created] = await db[
    DB_TABLE_NAMES.DEVICE_TOKEN
  ].findOrCreate({
    where: {
      deviceToken: data.deviceToken,
    },
    defaults: {
      ...data,
    },
  })

  if (created) {
    return !!deviceToken
  }

  if (deviceToken.userId === data.userId) {
    return !!deviceToken
  }

  await deviceToken.update({
    userId: data.userId,
  })

  return !!deviceToken
}

export const deleteDeviceToken = async ({ deviceToken, userId }) => {
  const result = await db[DB_TABLE_NAMES.DEVICE_TOKEN].destroy({
    where: {
      deviceToken,
      userId,
    },
  })

  return !!result
}

export const getDeviceTokens = async (userIds) => {
  const data = await db[DB_TABLE_NAMES.DEVICE_TOKEN].findAll({
    attributes: ['deviceToken'],
    where: {
      userId: {
        [Op.in]: userIds,
      },
    },
  })

  const deviceTokens = Array.from(data).map(
    (deviceToken) => deviceToken.deviceToken
  )

  return deviceTokens
}
