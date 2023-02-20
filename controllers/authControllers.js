const bcrypt = require( "bcrypt" )
const User = require( "../models/User" )
const authServices = require( "../services/authService" )
const sessionUtils = require( "../lib/auth/session" )
const apiUtils = require( "../utils/apiUtils" )

module.exports = async function signin( request, response ) {
    const { email, password } = request.body

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

        apiUtils.responseBuilder( response, responseContext )
    } catch ( error ) {
        next( error )
    }
}

module.exports = async function signup( request, response ) {
    const { userName, password, email } = request.body

    try {
        const userExists = await User.findOne( { email } )

        if ( userExists ) {
            response.status( 400 )
            throw new Error( "User already exists" )
        }

        const user = new User( {
            name: userName,
            email: email,
            password: await bcrypt.hash( password, await bcrypt.genSalt() ),
            role: process.env.ADMIN_KEY === email ? "admin" : "member",
        } ).save()

        sessionUtils.regenerateSession( request, user )

        return res.status( 200 ).json( {
            msg: `${user.name} successfully logged in`,
            isAuthenticated: true,
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,
            },
        } )
    } catch ( error ) {
        next( error )
    }
}

module.exports = async function signout( request, response ) {
    try {
        sessionUtils.destroySession( request, response )
    } catch ( error ) {
        next( error )
    }
}
