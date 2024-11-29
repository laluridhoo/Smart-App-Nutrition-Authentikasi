const authController = require("../controllers/authController");

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    handler: authController.register,
  },
  {
    method: "POST",
    path: "/login",
    handler: authController.login,
  },
  {
    method: "POST",
    path: "/logout",
    handler: authController.logout,
  },
];

module.exports = authRoutes;
