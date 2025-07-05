import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  },
})
export class RewardsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('RewardsGateway');
  private userSockets: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Remove user from userSockets map
    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('joinUser')
  handleJoinUser(client: Socket, userId: string) {
    this.userSockets.set(userId, client.id);
    client.join(`user_${userId}`);
    this.logger.log(`User ${userId} joined with socket ${client.id}`);
  }

  notifyPointsUpdate(userId: string, newPoints: number) {
    this.server.to(`user_${userId}`).emit('pointsUpdated', {
      userId,
      newPoints,
      timestamp: new Date().toISOString(),
    });
  }

  notifyRedemption(userId: string, redemptionData: any) {
    this.server.to(`user_${userId}`).emit('redemptionCompleted', {
      userId,
      ...redemptionData,
      timestamp: new Date().toISOString(),
    });
  }
}