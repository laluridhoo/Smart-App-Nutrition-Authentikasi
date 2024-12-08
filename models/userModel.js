const db = require("../utils/db");

const createUser = async (username, email, hashedPassword) => {
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  await db.query(query, [username, email, hashedPassword]);
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.query(query, [email]);
  return rows[0];
};

const getUserById = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0] || null; // Kembalikan user pertama atau null jika tidak ditemukan
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Propagate error ke handler utama
  }
};

const updateUser = async (id, username, password) => {
  //+
  const query = "UPDATE users SET username = ?, password = ? WHERE id = ?"; //+
  await db.query(query, [username, password, id]); //+
};

module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  getUserById,
};
