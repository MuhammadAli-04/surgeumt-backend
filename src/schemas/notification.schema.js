import Joi from 'joi'

export const sendNotificationSchema = Joi.object({
  childId: Joi.string().uuid().required().messages({
    'string.base': 'childId must be a string.',
    'string.guid': 'childId must be a valid UUID.',
    'any.required': 'childId is required.',
  }),
  type: Joi.string()
    .empty('')
    .valid('sos', 'sos-cancel', 'child-battery-low')
    .required()
    .messages({
      'any.required': 'Type is required',
      'string.empty': 'Type is required',
      'string.base': 'Type must be in string format',
      'any.only':
        'Type must be one of the following: ["sos", "sos-cancel", "child-battery-low","child-delete"]',
    }),
  batteryLevel: Joi.number().when('type', {
    is: 'child-battery-low',
    then: Joi.number().required().min(0).max(20).messages({
      'number.base': 'Battery level must be a number.',
      'any.required':
        'Battery level is required when type is "child-battery-low".',
      'number.min': 'Battery level must be at least 0.',
      'number.max': 'Battery level must be at most 20.',
    }),
    otherwise: Joi.forbidden(),
  }),
})
