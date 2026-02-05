const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        items: {
            type: [cartItemSchema],
            default: []
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
