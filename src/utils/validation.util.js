import { DateRegx } from './regx.util'

export const validateDate = (dateStr, helpers) => {
  if (!DateRegx.test(dateStr)) {
    return helpers.error('string.pattern.base')
  }
  const separator = dateStr.includes('-') ? '-' : '/'
  const [day, month, year] = dateStr.split(separator).map(Number)

  const date = new Date(year, month - 1, day)

  if (
    !(
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    )
  ) {
    return helpers.error('string.pattern.base')
  }

  return date
}

export const validateFile = (value, helpers) => {
  const { req } = helpers.state.ancestors[0]
  if (req.file && req.file.fieldname === 'avatar') {
    const file = req.file
    const allowedMimeTypes = ['image/jpeg', 'image/png']

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return helpers.message('Avatar must be an image (jpeg, png)')
    }

    if (file.size > 5 * 1024 * 1024) {
      return helpers.message('Avatar must be smaller than 5 MB')
    }
  } else {
    return helpers.message('Avatar is required')
  }

  return value
}
