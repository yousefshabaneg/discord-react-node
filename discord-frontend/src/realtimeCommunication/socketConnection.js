import io from "socket.io-client";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  socket = io("http://localhost:5002", {
    auth: {
      token: userDetails?.token,
    },
  });

  socket.on("connect", () => {
    console.log("Successfully connected with socket.io: ", socket.id);
  });
};
