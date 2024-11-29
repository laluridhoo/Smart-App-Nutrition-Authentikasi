const { createUser, getUserByEmail } = require("../models/userModel");
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
  const user = await getUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    return h.response({ message: "Email atau password salah" }).code(401);
  }

  // Simpan sesi
  request.cookieAuth.set({ id: user.id });

  return h.response({ message: "Login berhasil" }).code(200);
};

const logout = async (request, h) => {
  request.cookieAuth.clear();
  return h.response({ message: "Logout berhasil" }).code(200);
};

module.exports = {
  register,
  login,
  logout,
};
