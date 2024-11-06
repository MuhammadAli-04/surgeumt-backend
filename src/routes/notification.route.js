import Router from 'express'
import { sendNotification } from 'controllers/notification/sendNotification.controller'
import { tokenValidator } from 'middlewares'
import { validate } from 'middlewares/validation.middleware'
import { sendNotificationSchema } from 'schemas/notification.schema'

const router = Router()

router.post(
  '/',
  tokenValidator,
  validate(sendNotificationSchema),
  sendNotification
)

export default router
