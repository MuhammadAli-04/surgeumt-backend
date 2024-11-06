import Joi from 'joi'
import { PasswordRegx } from 'utils/regx.util'

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
})

export const signupSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .pattern(PasswordRegx)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm Password must match the password',
      'any.required': 'Confirm Password is required',
      'string.empty': 'Confirm Password is required',
    }),
})

export const sendOtpSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
  }),
  type: Joi.string()
    .email()
    .trim()
    .valid('signup', 'forgotPassword')
    .required()
    .messages({
      'string.base': 'Type must be a string',
      'any.required': 'Type is required',
      'string.empty': 'Type is required',
      'any.only': 'Type must be one of [signup, forgotPassword]',
    }),
})

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
  }),
  otp: Joi.string().regex(/^\d+$/).trim().length(6).required().messages({
    'string.base': 'OTP must be a string',
    'any.required': 'OTP is required',
    'string.empty': 'OTP is required',
    'string.alphanum': 'OTP must only contain alphanumeric characters',
    'string.pattern.base': 'OTP must be numbers only',
    'string.length': 'OTP must be exactly 6 characters long',
  }),
})

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string()
    .trim()
    .min(8)
    .pattern(PasswordRegx)
    .required()
    .messages({
      'string.min': 'New Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      'any.required': 'New Password is required',
      'string.empty': 'New Password is required',
    }),
  confirmNewPassword: Joi.string()
    .trim()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm New Password must match the New password',
      'any.required': 'Confirm New Password is required',
      'string.empty': 'Confirm New Password is required',
    }),
})

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .trim()
    .min(8)
    .pattern(PasswordRegx)
    .required()
    .messages({
      'string.min': 'Old Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      'any.required': 'Old Password is required',
      'string.empty': 'Old Password is required',
    }),
  newPassword: Joi.string()
    .trim()
    .min(8)
    .pattern(PasswordRegx)
    .required()
    .messages({
      'string.min': 'New Password must be at least 8 characters long',
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      'any.required': 'New Password is required',
      'string.empty': 'New Password is required',
    }),
  confirmNewPassword: Joi.string()
    .trim()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Confirm New Password must match the New password',
      'any.required': 'Confirm New Password is required',
      'string.empty': 'Confirm New Password is required',
    }),
})
