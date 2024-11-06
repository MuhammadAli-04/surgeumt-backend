export const devErrorWithStack = {
  type: 'object',
  properties: {
    status: {
      type: 'integer',
      example: 500,
    },
    message: {
      type: 'string',
    },
    stack: {
      type: 'string',
    },
    // error: {
    //   type: 'string',
    // },
  },
}

export const error = {
  type: 'object',
  properties: {
    status: {
      type: 'integer',
      example: 500,
    },
    message: {
      type: 'string',
    },
  },
}
