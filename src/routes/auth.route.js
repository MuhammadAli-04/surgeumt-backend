import { Router } from 'express'
import { login } from 'controllers/auth/login.controller'
import { me } from 'controllers/auth/me.controller'
import { issueNewAccessToken } from 'controllers/auth/refreshToken.controller'
import { resetPassword } from 'controllers/auth/resetPassword.controller'
import { sendOtpEmail } from 'controllers/auth/sendOtp.controller'
import { signup } from 'controllers/auth/signup.controller'
import { updateUserPassword } from 'controllers/auth/updatePassword.controller'
import { verifyOtp } from 'controllers/auth/verifyOtp.controller'
import { tokenValidator } from 'middlewares'
import {
  refreshTokenValidator,
  signupDuplicateValidatorBeforeSendOtp,
  verifyTokenBeforeResetPassword,
  verifyTokenBeforeSignup,
} from 'middlewares/auth.middleware'
import { validate } from 'middlewares/validation.middleware'
import {
  loginSchema,
  resetPasswordSchema,
  sendOtpSchema,
  signupSchema,
  updatePasswordSchema,
  verifyOtpSchema,
} from 'schemas/auth.schema'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post(
  '/signup',
  validate(signupSchema),
  verifyTokenBeforeSignup,
  // signupDuplicateValidator,
  signup
)
router.get('/me', tokenValidator, me)
//todo: update refreshTokenValidator to tokenValidator('refresh')
router.post('/refreshToken', refreshTokenValidator, issueNewAccessToken)
router.post(
  '/sendOtp',
  validate(sendOtpSchema),
  signupDuplicateValidatorBeforeSendOtp,
  sendOtpEmail
)
router.post('/verifyOtp', validate(verifyOtpSchema), verifyOtp)
router.post(
  '/resetPassword',
  validate(resetPasswordSchema),
  //todo: update verifyTokenBeforeResetPassword to tokenValidator('otp')
  verifyTokenBeforeResetPassword,
  resetPassword
)
router.post(
  '/updatePassword',
  validate(updatePasswordSchema),
  tokenValidator,
  updateUserPassword
)

export default router
