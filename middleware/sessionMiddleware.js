module.exports = function setUpSessionMiddleware( request, response, next ) {
    if ( !request?.session?.user ) {
        request.session.user = { role: "guest" }
    }
    next()
}

module.exports = function checkMemberMiddleware( request, response, next ) {
    if ( request?.session?.user?.role === "guest" ) {
        response.status( 401 ).json( { msg: "Not permitted" } )
    }
    next()
}
