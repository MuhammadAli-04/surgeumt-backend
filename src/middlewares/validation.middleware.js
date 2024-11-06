import AppError from 'utils/appError.util'

export const validate =
  (schema, options = { type: 'body', joiOptions: {} }) =>
  (req, res, next) => {
    const data = req[options.type]
    const result = schema.validate(data, {
      abortEarly: true,
      convert: true,
      stripUnknown: true,
      ...options.joiOptions,
    })
    req[options.type] = result.value
    if (result.error) {
      const errorMessages = result.error.details
        .map((detail) => detail.message)
        .join(',')
      return next(new AppError(errorMessages, 400))
    }

    next()
  }
