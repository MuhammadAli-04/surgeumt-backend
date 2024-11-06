export const prepareSuccessResponse = (data) => {
  const response = {
    type: 'object',
    properties: {
      status: {
        type: 'number',
        example: 200,
      },
      message: {
        type: 'string',
      },
    },
  }

  if (data) {
    response.properties.data = data
  }
  return response
}

export const getResponses = (options = {}) => {
  const { description = 'Success Response', data } = options

  return {
    200: {
      description,
      content: {
        'application/json': {
          schema: prepareSuccessResponse(data),
        },
      },
    },
    500: {
      description: 'Internal Error',
      content: {
        'application/json': {
          schema: {
            oneOf: [
              {
                $ref: '#/components/schemas/devErrorWithStack',
              },
              {
                $ref: '#/components/schemas/error',
              },
            ],
          },
        },
      },
    },
  }
}
