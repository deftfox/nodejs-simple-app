import * as Joi from 'joi'

export const userValidationSchema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().greater(3).less(131).required()
})