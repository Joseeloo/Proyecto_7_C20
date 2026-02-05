const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        stripeProductId: {
            type: String,
            required: true
        },
        stripePriceId: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: "clp"
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        img: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        stock: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
