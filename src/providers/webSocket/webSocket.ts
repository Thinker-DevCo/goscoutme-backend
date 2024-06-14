import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";
import { RedisService } from "../redis/redisClient";

interface IJoinData {
  user_id: string;
}

export class ServerSocket  extends RedisService{
  public static instance: ServerSocket;
  public io: Server;
  private readonly redis: RedisService;

  public users: { [uid: string]: Socket };

  constructor(server: HTTPServer) {
    super()
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });
    this.redis = new RedisService()
    this.io.on("connection", this.startListeners);
    console.info("Socket IO started");
  }
  startListeners = (socket: Socket) => {
  };
  public async unsubscribeUser(user: string){
    await this.redis.unsubscribe(user, this.io);
  }
  public async subscribeUser(user: string, duration: number){
    await this.redis.subscribe(user, this.io, duration);
  }

}