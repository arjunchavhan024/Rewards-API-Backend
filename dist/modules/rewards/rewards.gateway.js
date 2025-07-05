"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let RewardsGateway = class RewardsGateway {
    constructor() {
        this.logger = new common_1.Logger('RewardsGateway');
        this.userSockets = new Map();
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        for (const [userId, socketId] of this.userSockets.entries()) {
            if (socketId === client.id) {
                this.userSockets.delete(userId);
                break;
            }
        }
    }
    handleJoinUser(client, userId) {
        this.userSockets.set(userId, client.id);
        client.join(`user_${userId}`);
        this.logger.log(`User ${userId} joined with socket ${client.id}`);
    }
    notifyPointsUpdate(userId, newPoints) {
        this.server.to(`user_${userId}`).emit('pointsUpdated', {
            userId,
            newPoints,
            timestamp: new Date().toISOString(),
        });
    }
    notifyRedemption(userId, redemptionData) {
        this.server.to(`user_${userId}`).emit('redemptionCompleted', Object.assign(Object.assign({ userId }, redemptionData), { timestamp: new Date().toISOString() }));
    }
};
exports.RewardsGateway = RewardsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RewardsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], RewardsGateway.prototype, "handleJoinUser", null);
exports.RewardsGateway = RewardsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3001',
            credentials: true,
        },
    })
], RewardsGateway);
//# sourceMappingURL=rewards.gateway.js.map