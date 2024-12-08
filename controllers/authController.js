require("dotenv").config();
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, updateUser, getUserById } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");

const register = async (request, h) => {
  const { username, email, password } = request.payload;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return h.response({ message: "Email sudah terdaftar" }).code(400);
    }
    const hashedPassword = await hashPassword(password);
    await createUser(username, email, hashedPassword);
    return h.response({ message: "Registrasi berhasil" }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ message: "Terjadi kesalahan" }).code(500);
  }
};

const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return h.response({ message: "Email atau password salah" }).code(401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return h.response({ message: "Email atau password salah" }).code(401);
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

    return h.response({ message: "Login berhasil", token }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: "Terjadi kesalahan" }).code(500);
  }
};

const logout = async (request, h) => {
  // Logout hanya dengan menghapus token di client
  return h.response({ message: "Logout berhasil" }).code(200);
};

const editUser = async (request, h) => {
  const { id, username, password } = request.payload;
  try {
    const user = await getUserById(id); // Cari berdasarkan id
    if (!user) {
      return h.response({ message: "User tidak ditemukan" }).code(404);
    }
    const hashedPassword = await hashPassword(password); // Hash password baru
    await updateUser(id, username, hashedPassword); // Update user
    return h.response({ message: "Update berhasil" }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: "Terjadi kesalahan" }).code(500);
  }
};

module.exports = {
  register,
  login,
  logout,
  editUser,
};
