const express = require( "express" )
const { loginValidation, registerValidation } = require( "../../validation" )

const {
    loginUser,
    registerUser,
    logoutUser,
} = require( "../../controllers/authControllers" )

const router = express.Router()

router.post( "/login", async ( req, res ) => {
    const { error } = loginValidation( req.body )
    if ( error )
        return res
            .status( 400 )
            .json( { msg: "error with signing in", isAuthenticated: false } )
    return loginUser( req.body )
} )

router.post( "/register", async ( req, res ) => {
    const { error } = registerValidation( req.body )
    if ( error ) {
        return res.status( 400 ).json( { msg: error.details[0].message } )
    }
    return registerUser( req.body )
} )

router.get( "/logout", function ( req, res ) {
    logoutUser( req.session.cookie )
} )

module.exports = router
