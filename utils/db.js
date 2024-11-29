require("dotenv").config();

const mysql = require("mysql2/promise");

// Konfigurasi koneksi database
const pool = mysql.createPool({
  host: process.env.CLOUD_SQL_HOST,
  user: process.env.CLOUD_SQL_USER,
  password: process.env.CLOUD_SQL_PASSWORD,
  database: process.env.CLOUD_SQL_DATABASE,
  connectionLimit: 10,
});

module.exports = pool;
