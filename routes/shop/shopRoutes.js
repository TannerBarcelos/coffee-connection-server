const express = require( "express" )

// Importing the user model
const User = require( "../../models/User" )

const router = express.Router()

router.post( "/find/geolocation", async ( req, res ) => {
    const { latitude, longitude } = req.body
    const shops = await fetch(
        `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee`,
        {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application-json",
            },
        }
    )
    res.send( await shops.json() )
} )

router.post( "/find/city", async ( req, res ) => {
    const { city } = req.body
    const shops = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=${city}&term=coffee`,
        {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application-json",
            },
        }
    )
    res.send( await shops.json() )
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
