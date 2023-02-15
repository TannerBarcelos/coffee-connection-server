const express = require("express");
const User = require("../../models/User");
const checkAdminMiddleware = require("../../middleware/sessionMiddleware");
const router = express.Router();

router.get("/users", checkAdminMiddleware, async (req, res) => {
    const userCollection = [];
    await User.find({}, (err, allUsers) => {
        allUsers.forEach((user) => {
            const { _id, name, email, role, date } = user; // pull our all properties except the password
            userCollection.push({ _id, name, email, role, date });
        });
    });
    res.json({ msg: "Fetched users successfully", users: userCollection });
});

module.exports = router;
