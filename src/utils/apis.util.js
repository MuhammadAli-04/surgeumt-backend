const applyHeaders = (res, headers = {}) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })
}

export const successResponse = {
  send: (res, { status = 200, headers = {} }) => {
    applyHeaders(res, headers)
    return res.status(status).json({
      status,
      message: 'success',
    })
  },
  sendData: (res, { status = 200, data }) => {
    applyHeaders(res)
    return res.status(status).json({
      status,
      message: 'success',
      data,
    })
  },
  sendMessage: (res, { status = 200, message = '' }) => {
    applyHeaders(res)
    return res.status(status).json({
      status,
      message,
    })
  },
}

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
