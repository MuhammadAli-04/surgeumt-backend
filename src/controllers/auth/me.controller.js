import { catchAsync, successResponse } from 'utils/apis.util'

export const me = catchAsync(async (req, res) => {
  successResponse.sendData(res, {
    data: req.user,
  })
})
