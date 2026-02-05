const jwt = require("jsonwebtoken");
const { fail } = require("../utils/response");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return fail(res, { status: 401, message: "Acceso no autorizado" });

  const [type, token] = authHeader.split(" ");
  if (!token || (type !== "Bearer" && type !== "Token")) {
    return fail(res, { status: 401, message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return fail(res, { status: 401, message: "Token inválido o expirado" });
  }
};
