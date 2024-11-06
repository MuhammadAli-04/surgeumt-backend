import env from '../configs/env.config'
import { DB_TABLE_NAMES } from 'constants/db.constant'

const Otp = (sequelize, DataTypes) => {
  const model = sequelize.define(DB_TABLE_NAMES.OTP, {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    consumedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    expiryDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  })
  model.beforeCreate(async (payload) => {
    payload.expiryDatetime = new Date(
      Date.now() + env.OTP_EXPIRY_TIME * 60 * 1000
    )
  })

  return model
}

export default Otp
