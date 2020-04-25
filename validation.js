const Joi = require('@hapi/joi')

const registerValidation = (data) => {

    //Validation
    const schema = Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data)
}

const loginValidation = (data) => {

    //Validation
    const schema = Joi.object({
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation