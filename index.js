const Hapi = require("@hapi/hapi");
const fs = require("fs");

const init = async () => {
  const server = Hapi.server({
    port: 443, // Gunakan port 443 untuk HTTPS
    host: "0.0.0.0",
    tls: {
      key: fs.readFileSync("/path/to/private.key"), // Path ke file kunci SSL
      cert: fs.readFileSync("/path/to/certificate.crt"), // Path ke file sertifikat SSL
    },
  });

  // Tambahkan routes seperti biasa
  server.route([
    // Route contoh
    {
      method: "GET",
      path: "/",
      handler: () => "Hello, Secure World!",
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
