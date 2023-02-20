module.exports.regenerateSession = async function ( request, user ) {
    request?.session?.regenerate( ( err ) => {
        if ( err ) {
            console.log( err )
        }
        request.session.user = user
        delete request.session.user.password
    } )
}

module.exports.destroySession = async function ( request, response ) {
    request?.session?.destroy( ( err ) => {
        if ( err ) {
            throw new Error( err )
        }
        response
            .clearCookie( process.env.AUTH_TOKEN, {} )
            .json( { message: "Goodbye" } )
    } )
}
