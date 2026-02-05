const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const Cart = require("../models/Cart");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/response");
const { isValidEmail } = require("../utils/validators");

exports.register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return fail(res, { status: 400, message: "Faltan campos obligatorios" });
    }
    if (!isValidEmail(email)) {
        return fail(res, { status: 400, message: "Email inválido" });
    }

    const found = await User.findOne({ email });
    if (found) return fail(res, { status: 409, message: "El usuario ya existe" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const cart = await Cart.create({ items: [] });

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        cart: cart._id,
    });

    const safeUser = await User.findById(user._id).select("-password");
    return ok(res, { status: 201, message: "Usuario registrado", data: { user: safeUser } });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return fail(res, { status: 400, message: "Email y password requeridos" });

    const user = await User.findOne({ email });
    if (!user) return fail(res, { status: 400, message: "Credenciales inválidas" });

    const correct = await bcryptjs.compare(password, user.password);
    if (!correct) return fail(res, { status: 400, message: "Credenciales inválidas" });

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    const safeUser = await User.findById(user._id).select("-password");
    return ok(res, { message: "Login OK", data: { token, user: safeUser } });
});

exports.me = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password").populate("cart");
    return ok(res, { data: { user } });
});

exports.updateMe = asyncHandler(async (req, res) => {
    const { username, email, password, country, address, zipcode } = req.body;

    const update = {};
    if (username) update.username = username;
    if (email) {
        if (!isValidEmail(email)) return fail(res, { status: 400, message: "Email inválido" });
        update.email = email;
    }
    if (country !== undefined) update.country = country;
    if (address !== undefined) update.address = address;
    if (zipcode !== undefined) update.zipcode = zipcode;

    if (password) {
        const salt = await bcryptjs.genSalt(10);
        update.password = await bcryptjs.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true, runValidators: true }).select(
        "-password"
    );

    return ok(res, { message: "Perfil actualizado", data: { user } });
});
