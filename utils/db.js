const mysql = require("mysql2/promise");

// Konfigurasi koneksi database
const pool = mysql.createPool({
  host: "34.50.69.254",
  user: "project",
  password: "ridho22",
  database: "project",
  connectionLimit: 10,
});

module.exports = pool;
