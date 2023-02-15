const session = require( "express-session" )

module.exports = function initializeSession() {
    return session( {
        secret: process.env.TOKEN_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
        name: "auth-token",
    } )
}

module.exports = async function generateSession( request, user ) { }

module.exports = async function regenerateSession( request, user ) {
    request?.session.regenerate( ( err ) => {
        if ( err ) {
            console.log( err )
        }
        request.session.user = user
        delete request.session.user.password
    } )
}

module.exports = async function destroySession( request, response ) {
    request?.session.destroy( ( err ) => {
        if ( err ) {
            throw new Error( err )
        }
        response
            .clearCookie( process.env.AUTH_TOKEN, {} )
            .json( { message: "Goodbye" } )
    } )
}
