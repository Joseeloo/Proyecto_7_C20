const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  getAll,
  getById,
  getBySlug,
  create,
  updateById,
  deleteById,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAll);
router.get("/slug/:slug", getBySlug);
router.get("/:id", getById);

router.post("/", auth, create);
router.put("/:id", auth, updateById);
router.delete("/:id", auth, deleteById);

module.exports = router;
