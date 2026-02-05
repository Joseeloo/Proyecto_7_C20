const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/response");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { isValidObjectId } = require("../utils/validators");

exports.getMyCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const cart = await Cart.findById(user.cart).populate("items.product");
    return ok(res, { data: { cart } });
});

exports.replaceMyCart = asyncHandler(async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) return fail(res, { status: 400, message: "items debe ser un array" });

    for (const it of items) {
        if (!it.product || !isValidObjectId(it.product)) {
            return fail(res, { status: 400, message: "product inválido en items" });
        }
        if (!it.quantity || Number(it.quantity) < 1) {
            return fail(res, { status: 400, message: "quantity inválida en items" });
        }
        const exists = await Product.findById(it.product);
        if (!exists) return fail(res, { status: 404, message: "Producto no existe" });
    }

    const user = await User.findById(req.user.id);
    const cart = await Cart.findByIdAndUpdate(
        user.cart,
        { items: items.map((x) => ({ product: x.product, quantity: Number(x.quantity) })) },
        { new: true }
    ).populate("items.product");

    return ok(res, { message: "Carrito actualizado", data: { cart } });
});
