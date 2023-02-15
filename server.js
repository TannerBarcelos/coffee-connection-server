const express = require( "express" )
const connectDb = require( "./lib/db/connectDb" )
const registerMiddlewares = require( "./middleware" )

require( "dotenv" ).config()

const app = express()

connectDb()
registerMiddlewares( app )

app.use( `/api/${process.env.API_VERSION}`, require( "./routes" ) )

app.listen( process.env.PORT || 5151, () =>
    console.log( `Express server is running on port ${process.env.PORT}` )
)
