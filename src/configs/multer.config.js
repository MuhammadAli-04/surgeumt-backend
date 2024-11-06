import logger from './logger.config'
import { APP_ERROR } from 'constants/error.constant'
import { allowedImageTypes } from 'constants/middleware.constant'
import AppError from 'utils/appError.util'

const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'avatar')
    logger.info(`uploadPath: ${uploadPath}`)

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, uploadPath)
      } else {
        cb(null, uploadPath)
      }
    })
  },
  filename: function (req, file, cb) {
    if (!allowedImageTypes.includes(path.extname(file.originalname))) {
      return cb(new AppError(APP_ERROR.AVATAR.FILE_TYPE_NOT_ALLOWED, 400))
    }
    const filename = uuidv4() + path.extname(file.originalname)
    req.body.avatar = filename
    logger.info(`filename: ${filename}`)
    req.avatarUpdated = true
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })

export default upload
