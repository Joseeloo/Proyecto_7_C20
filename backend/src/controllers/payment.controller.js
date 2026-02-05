const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/response");
const User = require("../models/User");
const Cart = require("../models/Cart");

const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createCheckoutSession = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const cart = await Cart.findById(user.cart).populate("items.product");

    if (!cart || cart.items.length === 0) {
        return fail(res, { status: 400, message: "Carrito vacío" });
    }

    const line_items = cart.items.map((it) => {
        return {
            price: it.product.stripePriceId,
            quantity: it.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        customer_email: user.email,
    });

    return ok(res, { data: { session_url: session.url, session } });
});
