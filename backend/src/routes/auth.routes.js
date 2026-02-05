const express = require("express");
const auth = require("../middleware/auth.middleware");
const { register, login, me, updateMe } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.put("/me", auth, updateMe);

module.exports = router;
