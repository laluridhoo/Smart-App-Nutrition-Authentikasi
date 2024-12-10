const db = require("../utils/db");

/**
 * Menambahkan user baru ke dalam database.
 * @param {string} username - Username pengguna.
 * @param {string} email - Email pengguna.
 * @param {string} hashedPassword - Password yang sudah di-hash.
 * @returns {Promise<void>}
 */
const createUser = async (username, email, hashedPassword) => {
  try {
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await db.query(query, [username, email, hashedPassword]);
  } catch (error) {
    console.error("Error saat membuat user:", error.message);
    throw error; // Biarkan handler yang menangani
  }
};

/**
 * Mengambil user berdasarkan email.
 * @param {string} email - Email pengguna.
 * @returns {Promise<Object|null>} - Data user jika ditemukan, atau null jika tidak ditemukan.
 */
const getUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error saat mencari user dengan email:", error.message);
    throw error; // Biarkan handler yang menangani
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
