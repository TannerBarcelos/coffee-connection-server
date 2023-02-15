const mongoose = require("mongoose");

module.exports = connectDb = () => {
    mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log("Connected to DB")
    );
};
