export const sendNotificationBody = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['child-battery-low', 'sos', 'sos-cancel'],
      example: 'sos-cancel',
    },
    isSilent: {
      type: 'boolean',
      example: true,
    },
    childId: {
      type: 'string',
      format: 'uuid',
      example: '8b1c260d-3d03-47fa-a455-f3fc74c21531',
    },
  },
}
