import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RewardsService } from '../src/modules/rewards/rewards.service';
import { UsersService } from '../src/modules/users/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('RewardsService', () => {
  let service: RewardsService;
  let mockRewardModel: any;
  let mockUsersService: any;

  const mockReward = {
    _id: 'reward123',
    userId: 'user123',
    totalPoints: 100,
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockRewardModel = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      create: jest.fn(),
      exec: jest.fn(),
    };

    mockUsersService = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardsService,
        {
          provide: getModelToken('Reward'),
          useValue: mockRewardModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<RewardsService>(RewardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPointsByUserId', () => {
    it('should return user points', async () => {
      const userId = 'user123';
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRewardModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockReward),
      });

      const result = await service.getPointsByUserId(userId);

      expect(result).toBe(100);
      expect(mockUsersService.findById).toHaveBeenCalledWith(userId);
      expect(mockRewardModel.findOne).toHaveBeenCalledWith({ userId });
    });

    it('should return 0 if no reward record exists', async () => {
      const userId = 'user123';
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRewardModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.getPointsByUserId(userId);

      expect(result).toBe(0);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'nonexistent';
      mockUsersService.findById.mockRejectedValue(new NotFoundException());

      await expect(service.getPointsByUserId(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addPoints', () => {
    it('should add points to user account', async () => {
      const userId = 'user123';
      const points = 50;
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRewardModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockReward, totalPoints: 150 }),
      });

      const result = await service.addPoints(userId, points);

      expect(result.totalPoints).toBe(150);
      expect(mockRewardModel.findOneAndUpdate).toHaveBeenCalledWith(
        { userId },
        { $inc: { totalPoints: points }, $set: { updatedAt: expect.any(Date) } },
        { new: true, upsert: true }
      );
    });

    it('should throw BadRequestException for negative points', async () => {
      const userId = 'user123';
      const points = -10;

      await expect(service.addPoints(userId, points)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deductPoints', () => {
    it('should deduct points from user account', async () => {
      const userId = 'user123';
      const points = 30;
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRewardModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockReward),
      });
      mockRewardModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockReward, totalPoints: 70 }),
      });

      const result = await service.deductPoints(userId, points);

      expect(result.totalPoints).toBe(70);
    });

    it('should throw BadRequestException for insufficient points', async () => {
      const userId = 'user123';
      const points = 150;
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRewardModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockReward),
      });

      await expect(service.deductPoints(userId, points)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for negative points', async () => {
      const userId = 'user123';
      const points = -10;

      await expect(service.deductPoints(userId, points)).rejects.toThrow(BadRequestException);
    });
  });
});