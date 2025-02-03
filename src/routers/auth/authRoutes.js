const Routes = require("express");
const register = require("../../controller/authController");
const login = require("../../controller/authController");

const authRoutes = Routes();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

module.exports = authRoutes;
