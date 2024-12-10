const bcrypt = require("bcrypt");

/**
 * Meng-hash password menggunakan bcrypt.
 * @param {string} password - Password yang akan di-hash.
 * @returns {Promise<string>} - Password yang sudah di-hash.
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Cost factor 10
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error saat hashing password:", error);
    throw new Error("Gagal meng-hash password.");
  }
};

/**
 * Membandingkan password dengan hashed password.
 * @param {string} password - Password asli yang diinput oleh user.
 * @param {string} hashedPassword - Password yang sudah di-hash dan disimpan di database.
 * @returns {Promise<boolean>} - Hasil validasi password.
 */
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error saat memvalidasi password:", error);
    throw new Error("Gagal memvalidasi password.");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
