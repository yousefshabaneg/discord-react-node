process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

require("dotenv").config();
require("./db");
const app = require("./app");

const http = require("http");

const PORT = process.env.PORT || process.env.API_PORT;

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err) => {
  if (err.name === "MongoServerError") {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  }
});
