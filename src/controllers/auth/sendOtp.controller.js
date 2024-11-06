import config from 'configs/env.config'
import logger from 'configs/logger.config'
import {
  emailTemplate,
  textTemplate,
  transporter,
} from 'configs/nodemailer.config'
import { generateNewOtp } from 'services/otp.service'
import { getSingleUser } from 'services/user.service'
import { catchAsync, successResponse } from 'utils/apis.util'

export const sendOtpEmail = catchAsync(async (req, res) => {
  const { email, type } = req.body
  const user = await getSingleUser({ email })
  if (!user && type === 'forgotPassword') {
    return successResponse.sendMessage(res, {
      message: 'Email sent successfully',
    })
  }

  const otp = await generateNewOtp(email)
  logger.info(`otp: ${email} ${otp}`)
  transporter
    .sendMail({
      from: `"Team Trackeye 360" <${config.SMTP_USER}>`,
      to: email,
      subject: 'OTP verification',
      text: textTemplate(otp),
      html: emailTemplate(otp),
    })
    .then(
      (info) => logger.info(`Email sent: ${info.messageId} to ${email}`),
      () => logger.error(`couldnot send email to ${email}`)
    )

  successResponse.sendMessage(res, { message: 'Email sent successfully' })
})
