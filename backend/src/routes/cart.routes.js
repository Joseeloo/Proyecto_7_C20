const express = require("express");
const auth = require("../middleware/auth.middleware");
const { getMyCart, replaceMyCart } = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", auth, getMyCart);
router.put("/", auth, replaceMyCart);

module.exports = router;
