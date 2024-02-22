import config from "./config";
import "./database";
import SocketServer from "./socketServer";

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app";
import http from "http";

const PORT = config.apiPort;

const server = http.createServer(app);
SocketServer.registerSocketServer(server);

server.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);

process.on("unhandledRejection", (err: Error) => {
  if (err.name === "MongoServerError") {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  }
});
