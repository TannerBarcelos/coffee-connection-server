module.exports.responseBuilder = function ( response, context ) {
    response.status( 200 ).json( context )
}
