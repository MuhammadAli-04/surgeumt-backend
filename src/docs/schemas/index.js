import * as authSchemas from 'docs/schemas/auth.schema.doc'
import * as errorSchema from 'docs/schemas/error.schema.doc'
import * as notificationSchemas from 'docs/schemas/notification.schema.doc'
import * as userSchemas from 'docs/schemas/user.schema.doc'

const schemas = {
  ...authSchemas,
  ...errorSchema,
  ...userSchemas,
  ...notificationSchemas,
}

export default schemas
