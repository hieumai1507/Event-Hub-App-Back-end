const Routes = require("express");
const register = require("../../controller/authController");

const authRoutes = Routes();

authRoutes.post("/register", register);

module.exports = authRoutes;
