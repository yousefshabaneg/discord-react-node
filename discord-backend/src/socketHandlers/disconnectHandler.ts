import { Socket } from "socket.io";
import ServerStore from "../serverStore";

const disconnectHandler = async (socket: Socket) => {
  ServerStore.disconnectUser(socket.id);
};

export default disconnectHandler;
