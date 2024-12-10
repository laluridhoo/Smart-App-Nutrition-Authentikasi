const authController = require("../controllers/authController");

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    handler: authController.register,
    options: {
      auth: false, // Nonaktifkan autentikasi untuk endpoint ini
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: authController.login,
    options: {
      auth: false, // Nonaktifkan autentikasi untuk endpoint ini
    },
  },
  {
    method: "POST",
    path: "/logout",
    handler: authController.logout,
    options: {
      auth: "session", // Hanya user yang login dapat mengakses
    },
  },
  {
    method: "PUT",
    path: "/users/username",
    handler: authController.updateUsernameHandler, // Ambil dari authController
    options: {
      auth: "session", // Hanya untuk user yang login
    },
  },
  {
    method: "PUT",
    path: "/users/update",
    handler: authController.updateUsernameHandler,
  },
  {
    method: "PUT",
    path: "/users/password",
    handler: authController.updatePasswordHandler, // Ambil dari authController
    options: {
      auth: "session", // Hanya untuk user yang login
    },
  },
];

module.exports = authRoutes;
