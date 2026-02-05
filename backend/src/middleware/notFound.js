const { fail } = require("../utils/response");

module.exports = (req, res) => {
  return fail(res, { status: 404, message: "Route not found" });
};
