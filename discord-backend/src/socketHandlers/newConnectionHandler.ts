import { Server, Socket } from "socket.io";
import ServerStore from "../serverStore";

const newConnectionHandler = async (socket: Socket, io: Server) => {
  const { user } = socket.user;
  console.log(user);
  ServerStore.addNewConnectedUser({
    socketId: socket.id,
    userId: user._id,
  });
  console.log("Current map: ", ServerStore.connectedUser);
};

export default newConnectionHandler;
