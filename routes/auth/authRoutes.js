const express = require( "express" )
const authContollers = require( "../../controllers/authControllers" )

const router = express.Router()

router.post( "/login", authContollers.signin )
router.post( "/register", authContollers.signup )
router.get( "/logout", authContollers.signout )

module.exports = router
