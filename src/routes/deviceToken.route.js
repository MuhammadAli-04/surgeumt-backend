import { removeDeviceToken } from 'controllers/deviceToken/deleteDeviceToken.controller'

const express = require('express')
const {
  saveDeviceToken,
} = require('controllers/deviceToken/saveDeviceToken.controller')
const { tokenValidator } = require('middlewares')
const { validate } = require('middlewares/validation.middleware')
const {
  storeDeviceTokenSchema,
  deleteDeviceTokenSchema,
} = require('schemas/deviceToken.schema')
const router = express.Router()

router.post(
  '/',
  tokenValidator,
  validate(storeDeviceTokenSchema),
  saveDeviceToken
)

router.delete(
  '/',
  tokenValidator,
  validate(deleteDeviceTokenSchema),
  removeDeviceToken
)

export default router
