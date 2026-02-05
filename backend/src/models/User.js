const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
        },
        cart: { 
            type: mongoose.Types.ObjectId, 
            ref: "Cart", 
            required: true 
        },
        country: { 
            type: String, 
            default: "" 
        },
        address: { 
            type: String, 
            default: "" 
        },
        zipcode: { 
            type: Number, 
            default: 0 
        },
        role: { 
            type: String, 
            enum: ["user", "admin"], 
            default: "user" 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
