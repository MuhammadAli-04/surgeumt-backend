import { UserTag } from 'docs/tags'
import { getResponses } from 'utils/swagger.util'

const tags = [UserTag.name]

const updateUser = {
  tags,
  summary: 'Update user API',
  description: 'API for updating user data',
  operationId: 'updateUser',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the user to be updated',
    },
  ],
  requestBody: {
    description: 'user data',
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          $ref: '#/components/schemas/updateUserBody',
        },
      },
    },
  },
  responses: getResponses(),
}

const fetchUser = {
  tags,
  summary: 'Get user API',
  description: "API for getting user's data ",
  operationId: 'getUserData',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the user to be updated',
    },
  ],
  responses: getResponses({
    data: {
      $ref: '#/components/schemas/getUserDataResponse',
    },
  }),
}

const deleteUser = {
  tags,
  summary: 'Delete user API',
  description: 'API for deleting user data',
  operationId: 'deleteUser',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the user to be deleted',
    },
  ],
  responses: getResponses(),
}

export default {
  '/api/user/:id': {
    get: fetchUser,
    put: updateUser,
    delete: deleteUser,
  },
}
