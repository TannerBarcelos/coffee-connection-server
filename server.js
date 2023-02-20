const express = require( "express" )
const connectDb = require( "./lib/db/connectDb" )
const registerMiddlewares = require( "./middleware" )
const session = require( "express-session" )

require( "dotenv" ).config()

const app = express()

connectDb()
registerMiddlewares( app )

app.use( session( {
    secret: process.env.TOKEN_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    name: "auth-token",
} ) )

app.use( function setUpSessionMiddleware( request, response, next ) {
    if ( !request?.session?.user ) {
        request.session.user = { role: "guest" }
    }
    next()
} )

app.use( `/api/${process.env.API_VERSION}`, require( "./routes" ) )

app.listen( process.env.PORT || 5151, () =>
    console.log( `Express server is running on port ${process.env.PORT}` )
)
