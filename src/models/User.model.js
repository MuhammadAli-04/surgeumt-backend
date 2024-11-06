import { DB_TABLE_NAMES } from 'constants/db.constant'
import { generateHash } from 'utils/encryption.util'

const User = (sequelize, DataTypes) => {
  const model = sequelize.define(
    DB_TABLE_NAMES.USER,
    {
      id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      countryCode: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      onboardingStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  )

  model.beforeCreate(async (payload) => {
    payload.password = await generateHash(payload.password)
  })

  return model
}

export default User
