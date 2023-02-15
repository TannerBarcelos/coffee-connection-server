const express = require( "express" )
const initializeSession = require( "../lib/auth/session" )
const setUpSessionMiddleware = require( "./sessionMiddleware" )
const cors = require( "cors" )

module.exports = function registerMiddlewares( app ) {
    app.use( express.json() )
    app.use( express.urlencoded( { extended: true } ) )
    app.use( cors( { credentials: true, origin: true } ) )
    // app.use( initializeSession )
    // app.use( setUpSessionMiddleware )
}
