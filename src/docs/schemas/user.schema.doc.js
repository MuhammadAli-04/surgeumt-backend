export const updateUserBody = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      example: 'John',
    },
    middleName: {
      type: 'string',
      nullable: true,
      example: 'Michael',
    },
    lastName: {
      type: 'string',
      example: 'Doe',
    },
    countryCode: {
      type: 'string',
      example: '1',
    },
    phoneNumber: {
      type: 'string',
      example: '1234567890',
    },
    avatar: {
      type: 'string',
      format: 'binary',
      example: 'avatar.jpg',
    },
  },
}

export const getUserDataResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'User data retrieved successfully.',
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          example: '5f78d75c-3476-454a-9c57-609ffd87ea68',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        firstName: {
          type: 'string',
          example: 'John',
        },
        middleName: {
          type: 'string',
          nullable: true,
          example: 'Michael',
        },
        lastName: {
          type: 'string',
          example: 'Doe',
        },
        countryCode: {
          type: 'string',
          example: '1',
        },
        phoneNumber: {
          type: 'string',
          example: '1234567890',
        },
        avatar: {
          type: 'string',
          example: 'avatar.jpg',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-08-30T12:34:56Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-08-30T12:34:56Z',
        },
      },
    },
  },
}
