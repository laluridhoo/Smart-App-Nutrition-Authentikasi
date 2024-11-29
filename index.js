const Hapi = require("@hapi/hapi");
const Cookie = require("@hapi/cookie");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0", // Agar dapat diakses melalui IP publik
  });

  // Register plugin cookie
  await server.register(Cookie);

  // Konfigurasi autentikasi berbasis sesi
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "my-app-session",
      password: process.env.COOKIE_SECRET, // Simpan di file .env
      isSecure: false, // Set true jika menggunakan HTTPS
    },
    validateFunc: async (request, session) => {
      const { id } = session;

      // Cek apakah sesi masih valid
      if (!id) {
        return { valid: false };
      }

      // Opsional: Fetch user dari database jika diperlukan
      const user = await getUserById(id); // Implementasi fungsi ini sesuai kebutuhan Anda
      if (!user) {
        return { valid: false };
      }

      return { valid: true, credentials: user };
    },
  });

  server.auth.default("session"); // Jadikan 'session' sebagai default auth strategy

  // Tambahkan rute aplikasi
  server.route(require("./routes/authRoutes"));

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
