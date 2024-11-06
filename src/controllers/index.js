import logger from 'configs/logger.config'
import { APP_ERROR } from 'constants/error.constant'
import { catchAsync } from 'utils/apis.util'
import AppError from 'utils/appError.util'

const fs = require('fs')
const path = require('path')

export const getAvatar = catchAsync(async (req, res, next) => {
  const fileName = req.params.filename
  const directoryPath = path.join(__dirname, '..', 'uploads', 'avatar')
  logger.info(fileName)
  logger.info(directoryPath)
  const filePath = path.join(directoryPath, fileName)

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return next(new AppError(APP_ERROR.NOT_FOUND, 404))
    }

    res.sendFile(filePath)
  })
})
