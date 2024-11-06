import Joi from 'joi'
import { validateDate } from 'utils/validation.util'

export const updateUserSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name is required',
  }),
  middleName: Joi.string().trim().allow('').optional(),
  lastName: Joi.string().trim().required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name is required',
  }),
  phoneNumber: Joi.string()
    .trim()
    .length(10)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number cannot contain characters other than digits',
      'string.length': 'Phone number must be exactly 10 digits long',
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number is required',
    }),
  countryCode: Joi.string()
    .trim()
    .min(1)
    .max(6)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Country code cannot contain characters other than digits',
      'string.min': 'Country code must contain at least 1 digit',
      'string.max': 'Country code can contain at most 6 digits',
      'any.required': 'Country code is required',
      'string.empty': 'Country code is required',
    }),
  avatar: Joi.any().optional(),
  onboardingStatus: Joi.string().valid('onboarded').optional().messages({
    'any.valid': 'Invalid onboarding status',
  }),
})

export const deleteUserSchema = Joi.object({
  password: Joi.string().trim().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
})
