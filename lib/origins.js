const allowedOrigins = [
    'http://localhost:5173', // allow localhost
    'https://coffee-connection.vercel.app/' // allow calls from vercel UI in prod
]

const corsOpts = {
    credentials: true,
    origin: ( origin, cb ) => {
        if ( allowedOrigins.indexOf( origin ) !== -1 || !origin ) {
            cb( null, true )
        } else {
            cb( new Error( 'CORS error: Remote origin not allowed' ) )
        }
    }
}

module.exports = { allowedOrigins, corsOpts }