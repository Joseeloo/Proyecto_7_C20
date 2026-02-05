const express = require("express");
const auth = require("../middleware/auth.middleware");
const { createCheckoutSession } = require("../controllers/payment.controller");

const router = express.Router();

router.post("/checkout-session", auth, createCheckoutSession);

module.exports = router;
