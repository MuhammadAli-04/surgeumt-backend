import fs from 'fs'
import path from 'path'
import logger from 'configs/logger.config'
import { DB_TABLE_NAMES } from 'constants/db.constant'
import db from 'models'

export const getSingleUser = async (conditions = {}, options = {}) => {
  return db[DB_TABLE_NAMES.USER].findOne({ where: conditions, ...options })
}

export const createUser = async (payload) => {
  return db[DB_TABLE_NAMES.USER].findOrCreate({
    where: {
      email: payload.email,
    },
    defaults: {
      ...payload,
      onboardingStatus: 'registered',
    },
  })
}

export const getUserByPk = async (pk, options = {}) => {
  const user = await db[DB_TABLE_NAMES.USER].findByPk(pk, options)
  delete user.dataValues.password
  return user
}

export const updateUser = async (payload, avatarUpdated = false) => {
  const user = await getSingleUser({ id: payload.id })

  if (avatarUpdated && user && user.avatar && payload.avatar) {
    fs.unlink(
      path.join(__dirname, '..', 'uploads', 'avatar', user.avatar),
      () => {}
    )

    logger.info(path.join(__dirname, '..', 'uploads', 'avatar', user.avatar))
  }

  return db[DB_TABLE_NAMES.USER].update(
    {
      ...payload,
    },
    {
      where: {
        id: payload.id,
      },
      returning: false,
    }
  )
}

export const updatePassword = async (email, password) => {
  return db[DB_TABLE_NAMES.USER].update(
    {
      password,
    },
    {
      where: {
        email,
      },
      returning: true,
    }
  )
}

export const destroyUser = async (id) => {
  return await db[DB_TABLE_NAMES.USER].destroy({
    where: {
      id,
    },
  })
}
