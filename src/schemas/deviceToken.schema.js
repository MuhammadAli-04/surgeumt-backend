import Joi from 'joi'

export const storeDeviceTokenSchema = Joi.object({
  platform: Joi.string().valid('ios', 'android').required().empty('').messages({
    'any.only': 'Platform must be either ios or android.',
    'any.required': 'Platform is required.',
    'string.empty': 'Platform is required.',
  }),
  deviceToken: Joi.string().required().empty('').messages({
    'string.base': 'Device token must be a string.',
    'any.required': 'Device token is required.',
    'string.empty': 'Device token is required.',
  }),
})

export const deleteDeviceTokenSchema = Joi.object({
  deviceToken: Joi.string().required().empty('').messages({
    'string.base': 'Device token must be a string.',
    'any.required': 'Device token is required.',
    'string.empty': 'Device token is required.',
  }),
  userId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .empty('')
    .messages({
      'string.guid': 'The ID must be a valid UUIDv4.',
      'any.required': 'ID is required.',
      'string.empty': 'ID is required.',
    }),
})
