import * as Joi from 'joi'

export const groupValidationSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
})