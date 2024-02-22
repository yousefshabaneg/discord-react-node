class ServerStore {
  static connectedUser = new Map();
  static addNewConnectedUser = ({
    socketId,
    userId,
  }: {
    socketId: any;
    userId: any;
  }) => {
    this.connectedUser.set(socketId, { userId });
  };

  static disconnectUser = (socketId: string) => {
    if (this.connectedUser.has(socketId)) {
      this.connectedUser.delete(socketId);
      console.log("Disconnected, Current map: ", this.connectedUser);
    }
  };
}

export default ServerStore;
