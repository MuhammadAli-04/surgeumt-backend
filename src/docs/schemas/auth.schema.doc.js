export const loginBody = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
}

export const loginResponse = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTA4NzE3N30.wK5FWCM6M6NNz3dq5SRDdv0obhtYK20WFDqYPPjHLQ8',
    },
    refreshToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
  },
}

export const signupBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'user@example.com',
    },
    password: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
    confirmPassword: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
  },
}

export const meResponse = {
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
      example: 'A.',
    },
    lastName: {
      type: 'string',
      example: 'Doe',
    },
    countryCode: {
      type: 'string',
      example: '92',
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
      example: '2023-12-01T10:00:00Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2024-01-01T10:00:00Z',
    },
  },
}

export const signupResponse = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          example: '550e8400-e29b-41d4-a716-446655440000',
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
          example: 'A.',
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
          example: '2024-01-01T12:00:00Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-06-01T12:00:00Z',
        },
      },
    },
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
    refreshToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTA4NzE3N30.wK5FWCM6M6NNz3dq5SRDdv0obhtYK20WFDqYPPjHLQ8',
    },
  },
}

export const refreshTokenResponse = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
    refreshToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTA4NzE3N30.wK5FWCM6M6NNz3dq5SRDdv0obhtYK20WFDqYPPjHLQ8',
    },
  },
}

export const sendOtpBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'user@example.com',
    },
  },
}

export const verifyOtpBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'user@example.com',
    },
    otp: { type: 'string', example: 'abc123Ab' },
  },
}

export const verifyOtpResponse = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'OTP verified successfully' },
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
  },
}

export const resetPasswordBody = {
  type: 'object',
  properties: {
    newPassword: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
    confirmNewPassword: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
  },
}

export const updatePasswordBody = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      example: 'Password123',
    },
    newPassword: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
    confirmNewPassword: {
      type: 'string',
      example: 'P@ssw0rd123',
    },
  },
}

export const childLoginBody = {
  type: 'object',
  properties: {
    joinCode: { type: 'string', example: 'abc123AB' },
  },
}

export const childLoginResponse = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'OTP verified successfully' },
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
    refreshToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOGFhODgxY2MtNDMzNS00ODAwLWI5ZTYtNzM5ZGYzMmQyM2RiIiwidHlwZSI6InBhcmVudCJ9LCJpYXQiOjE3MjUwMDA3NzcsImV4cCI6MTcyNTYwNTU3N30.wgUtctDndEoejayVXSkdxf4-PbUkCBz3em2YmhV--6k',
    },
  },
}

export const childLogoutBody = {
  type: 'object',
  properties: {
    joinCode: { type: 'string', example: 'abc123AB' },
  },
}
