const Joi = require('joi')

export const onSocketConnectSchema = Joi.object({
  accessToken: Joi.string().required(),
})
