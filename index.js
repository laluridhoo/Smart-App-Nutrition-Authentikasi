const Hapi = require("@hapi/hapi");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT || 8080;

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(authRoutes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
