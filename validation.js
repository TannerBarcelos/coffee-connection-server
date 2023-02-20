const Joi = require( "@hapi/joi" )

module.exports.registerValidation = function ( body ) {
    const schema = Joi.object( {
        userName: Joi.string().min( 6 ).required(),
        email: Joi.string().min( 6 ).required().email(),
        password: Joi.string().min( 6 ).required(),
    } )
    return schema.validate( body )
}

module.exports.loginValidation = function ( body ) {
    const schema = Joi.object( {
        email: Joi.string().min( 6 ).required().email(),
        password: Joi.string().min( 6 ).required(),
    } )
    return schema.validate( body )
}

// This is not good if using TypeScript.. better to use Zod