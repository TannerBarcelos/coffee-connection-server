const express = require( "express" )

// Importing the user model
const User = require( "../../models/User" )

const router = express.Router()

const { axiosInstance } = require( '../../utils/axios' )

router.post( "/find/geolocation", async ( req, res ) => {
    const { latitude, longitude } = req.body
    const shops = await axiosInstance.get( `/search?latitude=${latitude}&longitude=${longitude}&term=coffee` )
    res.send( shops.data )
} )

router.post( "/find/city", async ( req, res ) => {
    const { city } = req.body
    const shops = await axiosInstance.get( `https://api.yelp.com/v3/businesses/search?location=${city}&term=coffee` )
    res.send( shops.data )
} )

router.post( "/bookmark", async ( req, res ) => {
    const { shopName, image_url, url, phone, address, rating, shopID, userID } =
        await User.findById( userID, async ( err, user ) => {
            if ( err ) {
                return res.status( 400 ).json( { msg: "User not found" } )
            } else {
                if (
                    user.bookmarkedShops.find(
                        ( bookmarkedCoffeeShop ) =>
                            bookmarkedCoffeeShop.name === shopName
                    )
                ) {
                    return res.json( { msg: "Item already bookmarked" } )
                } else {
                    const shop = {
                        name: shopName,
                        imageURL: image_url,
                        url: url,
                        phone: phone,
                        address: address,
                        shopID: shopID,
                        rating: rating,
                    }
                    user.bookmarkedShops.push( shop ) // push this shop to the array for this user
                    await user.save()
                    return res.json( { msg: user } )
                }
            }
        } )
} )

router.get( "/shops/:userid", async ( req, res ) => {
    const userID = req.params.userid
    await User.findById( userID, async ( err, user ) => {
        if ( err ) {
            return res.status( 400 ).json( { msg: "User not found" } )
        } else {
            return res.json( user.bookmarkedShops )
        }
    } )
} )

router.post( "/remove", async ( req, res ) => {
    const { shopID, userID } = req.body
    await User.findById( userID, async ( err, user ) => {
        if ( err ) {
            return res.status( 400 ).json( { msg: "User not found" } )
        } else {
            const filteredOut = user.bookmarkedShops.filter(
                ( shop ) => shop.shopID !== shopID
            )
            user.bookmarkedShops = null
            user.bookmarkedShops = filteredOut
            await user.save()
            return res.json( user.bookmarkedShops )
        }
    } )
} )

module.exports = router
