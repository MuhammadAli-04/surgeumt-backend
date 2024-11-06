import { DB_TABLE_NAMES } from 'constants/db.constant'

const Table = (sequelize, DataTypes) => {
  const deviceToken = sequelize.define(DB_TABLE_NAMES.DEVICE_TOKEN, {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    platform: {
      type: DataTypes.ENUM('ios', 'android'),
      allowNull: false,
    },
    deviceToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return deviceToken
}

export default Table
