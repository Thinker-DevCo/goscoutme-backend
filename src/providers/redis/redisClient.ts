import { Redis } from 'ioredis';
import { Server } from 'socket.io';

export class RedisService {
  private readonly cacheClient: Redis;
  private readonly pubClient: Redis;
  private readonly subClient: Redis;
  private cleanupInterval:number = 60000;
  private expirationQueue =[];
  private readonly subscribers: { [channel: string]: Server[] } = {};
  constructor() {
    this.cacheClient = new Redis(process.env.REDIS_URL);
    this.pubClient = new Redis(process.env.REDIS_URL);
    this.subClient = new Redis(process.env.REDIS_URL);

    this.initCleanupJob();
    this.cacheClient.on('error', (err) => {
      console.log('Error on Redis cache client');
      console.log(err);
      process.exit(1);
    });

    this.pubClient.on('error', (err) => {
      console.log('Error on Redis Pub/Sub client');
      console.log(err);
      process.exit(1);
    });
    this.subClient.on('error', (err) => {
      console.log('Error on Redis Pub/Sub client');
      console.log(err);
      process.exit(1);
    });

    this.cacheClient.on('connect', () => {
      console.log('Redis cache client connected');
    });

    this.pubClient.on('connect', () => {
      console.log('Redis Pub/Sub client connected');
    });
    this.subClient.on('connect', () => {
      console.log('Redis Pub/Sub client connected');
    });

    this.subClient.on('message', (channel: string, message: string) => {
      if (this.subscribers[channel]) {
        for (const server of this.subscribers[channel]) {
          server.emit(channel, message);
        }
      }
    });
  }

  // Redis caching methods

  async get(key: string) {
    return await this.cacheClient.get(key);
  }

  async set(key: string, value: string, mode?: string, duration?: number) {
    if (mode === 'EX' && duration) {
      return await this.cacheClient.set(key, value, mode, duration);
    }
    return await this.cacheClient.set(key, value);
  }

  // Redis Pub/Sub methods

  async subscribe(channel: string, server: Server, duration?: number) {
    if (!this.subscribers[channel]) {
      this.subscribers[channel] = [];
      console.log(this.subscribers, "created")
      await this.subClient.subscribe(channel);
      this.expirationQueue.push({ channel, expiry: Date.now() + duration });
      this.expirationQueue.sort((a, b) => a.expiry - b.expiry);
    }
    if(this.subscribers[channel].find((s)=> server)){
      return;
    }else{
      return this.subscribers[channel].push(server);
    }
  }

  async publish(channel: string, message: string) {
    return await this.pubClient.publish(channel, message);
  }

  async unsubscribe(channel: string, server: Server) {
    if (this.subscribers[channel]) {
      const index = this.subscribers[channel].indexOf(server);
      if (index !== -1) {
        this.subscribers[channel].splice(index, 1);
        if (this.subscribers[channel].length === 0) {
          delete this.subscribers[channel];
          return await this.subClient.unsubscribe(channel);
        }
      }
    }
  }
  initCleanupJob() {
    setInterval(() => this.cleanupExpiredSubscriptions(), this.cleanupInterval);
  }

  cleanupExpiredSubscriptions() {
    const now = Date.now();
    while (this.expirationQueue.length > 0 && this.expirationQueue[0].expiry <= now) {
      const { channel } = this.expirationQueue.shift();
      if (this.subscribers[channel]) {
        delete this.subscribers[channel];
        this.subClient.unsubscribe(channel).then(() => {
          console.log(`Channel ${channel} has been removed.`);
        });
      }
    }
  }
}