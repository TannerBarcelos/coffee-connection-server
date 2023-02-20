const express = require( "express" )
const cors = require( "cors" )
const { corsOpts } = require( '../lib/origins' )

module.exports = function registerMiddlewares( app ) {
    app.use( express.json() )
    app.use( express.urlencoded( { extended: true } ) )
    app.use( cors( corsOpts ) )
}

