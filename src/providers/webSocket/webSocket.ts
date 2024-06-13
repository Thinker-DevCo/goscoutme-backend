import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: Socket };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });
    this.io.on("connection", this.startListeners);
    console.info("Socket IO started");
  }
  startListeners = (socket: Socket) => {
    console.log("connection on: ", socket.id);
  };
}