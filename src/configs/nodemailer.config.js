import { createTransport } from 'nodemailer'
import config from './env.config'
import logger from './logger.config'

export const transporter = createTransport({
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  secure: config.SMTP_PORT === '465',
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
})
transporter.verify((error, success) => {
  if (error) {
    logger.error(error.toString())
  } else {
    logger.info('👍 Email service initiated successfully')
  }
})

export const emailTemplate = (otp) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>OTP Verification</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for verifying your account is:</p>
            <p class="otp">${otp}</p>
            <p>Please enter this OTP to complete your verification. Note that this OTP is valid for the next 15 minutes.</p>
        </div>
        <div class="footer">
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    </div>
</body>
</html>`

export const textTemplate = (otp) =>
  `Your One-Time Password (OTP) for verifying your account is: ${otp}. Please enter this OTP to complete your verification. Note that this OTP is valid for the next 15 minutes.If you did not request this code, please ignore this email.`
