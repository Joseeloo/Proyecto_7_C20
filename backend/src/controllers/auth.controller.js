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
  const { username, email, country, address, zipcode, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return fail(res, { status: 404, message: "Usuario no encontrado" });
  }

  const update = {};

  if (username && username !== user.username) {
    update.username = username;
  }

  if (email && email !== user.email) {
    if (!isValidEmail(email)) {
      return fail(res, { status: 400, message: "Email inválido" });
    }
    update.email = email;
  }

  if (country !== undefined && country !== user.country) {
    update.country = country;
  }

  if (address !== undefined && address !== user.address) {
    update.address = address;
  }

  if (zipcode !== undefined && zipcode !== user.zipcode) {
    update.zipcode = zipcode;
  }

  if (newPassword) {
    if (!currentPassword) {
      return fail(res, {
        status: 400,
        message: "Debes ingresar tu contraseña actual",
      });
    }

    const isMatch = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return fail(res, {
        status: 400,
        message: "La contraseña actual es incorrecta",
      });
    }

    if (newPassword.length < 8) {
      return fail(res, {
        status: 400,
        message: "La nueva contraseña debe tener al menos 8 caracteres",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    update.password = await bcryptjs.hash(newPassword, salt);
  }

  if (Object.keys(update).length === 0) {
    return ok(res, {
      message: "No se realizaron cambios",
      data: { user: await User.findById(user._id).select("-password") },
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    update,
    { new: true, runValidators: true }
  ).select("-password");

  return ok(res, {
    message: newPassword
      ? "Perfil y contraseña actualizados correctamente"
      : "Perfil actualizado correctamente",
    data: { user: updatedUser },
  });
});
