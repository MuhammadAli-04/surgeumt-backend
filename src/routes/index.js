import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { ENV } from 'constants/app.constant'
import { getAvatar } from 'controllers'
import swaggerOptions from 'docs/swagger'
import envAccessControl from 'middlewares/envAccessControl.middleware'
import authRoutes from 'routes/auth.route'
import deviceTokenRoutes from 'routes/deviceToken.route'
import notificationRoutes from 'routes/notification.route'
import userRoutes from 'routes/user.route'
import { successResponse } from 'utils/apis.util'

const router = express.Router()
const specs = swaggerJSDoc(swaggerOptions)

router.get('/ping', (req, res) => {
  successResponse.sendMessage(res, {
    message: 'Server is live',
  })
})

router.use(
  '/docs',
  envAccessControl([ENV.DEV]),
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

router.get('/docs.json', envAccessControl([ENV.DEV]), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/deviceToken', deviceTokenRoutes)
router.use('/notification', notificationRoutes)
router.get('/avatar/:filename', getAvatar)

export default router
