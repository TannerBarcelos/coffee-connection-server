const express = require("express");
const authRoutes = require("./auth/authRoutes");
const shopRoutes = require("./shop/shopRoutes");
const userRoutes = require("./user/userRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/shop", shopRoutes);

module.exports = router;
