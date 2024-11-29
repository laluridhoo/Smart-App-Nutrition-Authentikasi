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

module.exports = {
  createUser,
  getUserByEmail,
};
