
const bcrypt = require("bcrypt");
const pool = require("../utils/db");
const { createUser, getUserByEmail } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");

// Handler untuk registrasi
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

// Handler untuk login
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

    // Simpan sesi pengguna
    request.cookieAuth.set({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    return h.response({ message: "Login berhasil" }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: "Terjadi kesalahan" }).code(500);
  }
};

// Handler untuk logout
const logout = async (request, h) => {
  request.cookieAuth.clear();
  return h.response({ message: "Logout berhasil" }).code(200);
};

// Handler untuk update username
const updateUsernameHandler = async (req, h) => {
  try {
    const { id, newUsername } = req.payload;

    // Validasi input
    if (!id || !newUsername) {
      return h.response({ message: "ID atau username baru tidak ditemukan" }).code(400);
    }

    // Pastikan username baru tidak kosong dan sesuai dengan kriteria yang diinginkan
    if (typeof newUsername !== "string" || newUsername.trim() === "") {
      return h.response({ message: "Username baru tidak valid" }).code(400);
    }

    // Query dengan koneksi pool
    const [result] = await pool.query("UPDATE users SET username = ? WHERE id = ?", [newUsername, id]);

    if (result.affectedRows === 0) {
      return h.response({ message: "User  ID tidak ditemukan" }).code(404);
    }

    return h.response({ message: "Username berhasil diperbarui" }).code(200);
  } catch (err) {
    console.error("Error:", err);
    return h.response({ message: "Terjadi kesalahan pada server" }).code(500);
  }
};
// Handler untuk update password
const updatePasswordHandler = async (request, h) => {
  const { oldPassword, newPassword } = request.payload;
  const userId = request.auth.credentials.userId;

  if (!oldPassword || !newPassword) {
    return h.response({ message: "Password lama dan baru harus diisi" }).code(400);
  }

  try {
    const [rows] = await pool.query("SELECT password FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return h.response({ message: "User tidak ditemukan" }).code(404);
    }

    const isValidOldPassword = await bcrypt.compare(oldPassword, rows[0].password);
    if (!isValidOldPassword) {
      return h.response({ message: "Password lama salah" }).code(400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

    return h.response({ message: "Password berhasil diperbarui" }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: "Terjadi kesalahan" }).code(500);
  }
};

module.exports = {
  register,
  login,
  logout,
  updateUsernameHandler,
  updatePasswordHandler,

};
