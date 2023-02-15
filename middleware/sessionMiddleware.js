// This initializes session state
module.exports = function setUpSessionMiddleware( req, res, next ) {
    if ( !req?.session?.user ) {
        req.session.user = { role: "guest" }
    }
    next()
}

// only members can access routes that are protected with this auth middleware
module.exports = function checkMemberMiddleware( req, res, next ) {
    if ( req?.session?.user?.role === "guest" ) {
        res.status( 401 ).json( { msg: "Not permitted" } )
    }
    next()
}
