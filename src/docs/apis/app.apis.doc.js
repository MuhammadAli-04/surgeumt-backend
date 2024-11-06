import { appTag } from 'docs/tags'

const tags = [appTag.name]
const serverPing = {
  tags,
  summary: 'Ping the server',
  description: 'Ping the server',
  operationId: 'serverPing',
  responses: {
    200: {
      description: 'Server is alive',
    },
  },
}

const getAvatar = {
  tags,
  summary: 'Get User image',
  description: 'Get User image',
  operationId: 'getAvatar',
  parameters: [
    {
      name: 'filename',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'Name of image (along file extension) to be fetched',
    },
  ],
  responses: {
    200: {
      description: 'Successful response with the image file',
      content: {
        image: {
          schema: {
            type: 'string',
            format: 'binary',
            example: 'avatar.png',
          },
        },
      },
    },
  },
}

export default {
  '/api/ping': {
    get: serverPing,
  },
  'api/avatar/:filename': {
    get: getAvatar,
  },
}
