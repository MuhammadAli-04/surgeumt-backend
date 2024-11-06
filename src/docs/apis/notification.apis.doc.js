import { notificationTag } from 'docs/tags'
import { getResponses } from 'utils/swagger.util'

const tags = [notificationTag.name]

const sendNotification = {
  tags,
  summary: 'Send notification API',
  description: 'API for creating new geofence point',
  operationId: 'sendNotification',
  requestBody: {
    description: "Geofence point's details",
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/sendNotificationBody',
        },
      },
    },
  },
  responses: getResponses({}),
}

export default {
  '/api/notification/': {
    post: sendNotification,
  },
}
