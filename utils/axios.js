const axios = require( 'axios' )

module.exports.axiosInstance = axios.create( {
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application-json",
    }
} )