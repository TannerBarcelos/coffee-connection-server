const Joi = require( "@hapi/joi" )

module.exports = registerValidation = ( reqBodyData ) => {
    const schema = Joi.object( {
        userName: Joi.string().min( 6 ).required(),
        email: Joi.string().min( 6 ).required().email(),
        password: Joi.string().min( 6 ).required(),
    } )
    return schema.validate( reqBodyData )
}

module.exports = loginValidation = ( reqBodyData ) => {
    const schema = Joi.object( {
        email: Joi.string().min( 6 ).required().email(),
        password: Joi.string().min( 6 ).required(),
    } )
    return schema.validate( reqBodyData )
}
