import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class RewardsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    private userSockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinUser(client: Socket, userId: string): void;
    notifyPointsUpdate(userId: string, newPoints: number): void;
    notifyRedemption(userId: string, redemptionData: any): void;
}
