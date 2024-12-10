require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "34.50.69.254",
  user: "project", // Ganti dengan username database Anda
  password: "ridho22", // Ganti dengan password database Anda
  database: "project", // Ganti dengan nama database Anda
});

module.exports = pool;
