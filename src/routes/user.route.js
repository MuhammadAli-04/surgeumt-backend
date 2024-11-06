import { Router } from 'express'
import upload from 'configs/multer.config'
import { deleteUser } from 'controllers/user/deleteUser.controller'
import { getUser } from 'controllers/user/getUser.controller'
import { updateUserData } from 'controllers/user/updateUser.controller'
import { tokenValidator } from 'middlewares'
import { validate } from 'middlewares/validation.middleware'
import { deleteUserSchema, updateUserSchema } from 'schemas/user.schema'
import AppError from 'utils/appError.util'

const router = Router()

router.get('/', tokenValidator, (req, res, next) => {
  return next(new AppError('Not implemented', 404))
})

router.get('/:id', tokenValidator, getUser)
router.put(
  '/:id',
  tokenValidator,
  upload.single('avatar'),
  validate(updateUserSchema),
  updateUserData
)

router.delete('/:id', tokenValidator, validate(deleteUserSchema), deleteUser)

export default router
