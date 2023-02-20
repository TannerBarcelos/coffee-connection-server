const bcrypt = require( "bcrypt" )
const User = require( "../models/User" )
const sessionUtils = require( "../lib/auth/session" )
const { loginValidation, registerValidation } = require( "../validation" )


module.exports.signin = async function ( request, response, next ) {
    const { data } = request.body // axios sends request.body as { method:'', data: ''}
    const { error } = loginValidation( data )
    if ( error )
        return res
            .status( 400 )
            .json( { msg: "error with signing in", isAuthenticated: false } )

    const { email, password } = data

    try {
        const user = await User.findOne( { email } )

        if ( !user ) {
            response.status( 400 )
            throw new Error( "User does not exist" )
        }

        const isValid = await bcrypt.compare( password, user.password )

        if ( !isValid ) {
            response.status( 400 )
            throw new Error( "Password is incorrect" )
        }

        sessionUtils.regenerateSession( request, user )

        const responseContext = {
            message: `${user.name} successfully logged in`,
            isAuthenticated: true,
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,
            },
        }

        response.status( 200 ).json( responseContext )

    } catch ( error ) {
        next( error )
    }
}

module.exports.signup = async function ( request, response, next ) {

    const { data } = request.body

    const { error } = registerValidation( data )

    if ( error ) {
        return res.status( 400 ).json( { msg: error.details[0].message } )
    }

    try {
        const { userName, password, email } = data

        const userExists = await User.findOne( { email } )

        if ( userExists ) {
            response.status( 400 )
            throw new Error( "User already exists" )
        }

        const salt = bcrypt.genSaltSync( 12 )

        const user = new User( {
            name: userName,
            email: email,
            password: bcrypt.hashSync( password, salt ),
            role: process.env.ADMIN_KEY === email ? "admin" : "member",
        } ).save()

        sessionUtils.regenerateSession( request, user )

        const responseContext = {
            msg: `${user.name} successfully logged in`,
            isAuthenticated: true,
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,
            },
        }

        return res.status( 200 ).json( responseContext )
    } catch ( error ) {
        next( error )
    }
}

module.exports.signout = async function ( request, response, next ) {
    try {
        sessionUtils.destroySession( request, response )
    } catch ( error ) {
        next( error )
    }
}
