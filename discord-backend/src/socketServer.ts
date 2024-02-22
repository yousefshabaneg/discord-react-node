import { Server } from "socket.io";
import http from "http";
import AuthMiddleware from "./middleware/authMiddleware";
import newConnectionHandler from "./socketHandlers/newConnectionHandler";
import disconnectHandler from "./socketHandlers/disconnectHandler";

class SocketServer {
  static registerSocketServer = (server: http.Server) => {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
    });

    io.use((socket, next) => {
      AuthMiddleware.verifyTokenSocket(socket, next);
    });

    io.on("connection", (socket) => {
      console.log(`User ${socket.id} is connected to server `);
      newConnectionHandler(socket, io);

      socket.on("disconnect", () => {
        disconnectHandler(socket);
      });
    });
  };
}

export default SocketServer;
