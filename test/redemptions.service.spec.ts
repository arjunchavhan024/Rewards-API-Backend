import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RedemptionsService } from '../src/modules/redemptions/redemptions.service';
import { UsersService } from '../src/modules/users/users.service';
import { RewardsService } from '../src/modules/rewards/rewards.service';
import { BadRequestException } from '@nestjs/common';
import { RewardType } from '../src/modules/redemptions/schemas/redemption.schema';

describe('RedemptionsService', () => {
  let service: RedemptionsService;
  let mockRedemptionModel: any;
  let mockUsersService: any;
  let mockRewardsService: any;

  const mockRedemption = {
    _id: 'redemption123',
    userId: 'user123',
    pointsRedeemed: 100,
    rewardType: RewardType.CASHBACK,
    rewardDetails: '$10 cashback',
    rewardValue: 10,
    timestamp: new Date(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    mockRedemptionModel = jest.fn().mockImplementation(() => ({
      ...mockRedemption,
      save: jest.fn().mockResolvedValue(mockRedemption),
    }));
    mockRedemptionModel.findOne = jest.fn();
    mockRedemptionModel.find = jest.fn();
    mockRedemptionModel.countDocuments = jest.fn();

    mockUsersService = {
      findById: jest.fn(),
    };

    mockRewardsService = {
      getPointsByUserId: jest.fn(),
      deductPoints: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedemptionsService,
        {
          provide: getModelToken('Redemption'),
          useValue: mockRedemptionModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: RewardsService,
          useValue: mockRewardsService,
        },
      ],
    }).compile();

    service = module.get<RedemptionsService>(RedemptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('redeemPoints', () => {
    const redeemPointsDto = {
      userId: 'user123',
      pointsToRedeem: 100,
      rewardType: RewardType.CASHBACK,
      rewardDetails: '$10 cashback',
      rewardValue: 10,
    };

    it('should successfully redeem points', async () => {
      mockUsersService.findById.mockResolvedValue({ _id: 'user123' });
      mockRewardsService.getPointsByUserId.mockResolvedValue(150);
      mockRewardsService.deductPoints.mockResolvedValue({});

      const result = await service.redeemPoints(redeemPointsDto);

      expect(result).toEqual(mockRedemption);
      expect(mockUsersService.findById).toHaveBeenCalledWith('user123');
      expect(mockRewardsService.getPointsByUserId).toHaveBeenCalledWith('user123');
      expect(mockRewardsService.deductPoints).toHaveBeenCalledWith('user123', 100);
    });

    it('should throw BadRequestException for insufficient points', async () => {
      mockUsersService.findById.mockResolvedValue({ _id: 'user123' });
      mockRewardsService.getPointsByUserId.mockResolvedValue(50);

      await expect(service.redeemPoints(redeemPointsDto)).rejects.toThrow(BadRequestException);
      expect(mockRewardsService.deductPoints).not.toHaveBeenCalled();
    });
  });

  describe('findByUserId', () => {
    it('should return paginated redemptions for user', async () => {
      const userId = 'user123';
      const paginationDto = { page: 1, limit: 10 };
      
      mockUsersService.findById.mockResolvedValue({ _id: userId });
      mockRedemptionModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockRedemption]),
            }),
          }),
        }),
      });
      mockRedemptionModel.countDocuments.mockReturnValue({
        exec: jest.fn().mockResolvedValue(1),
      });

      const result = await service.findByUserId(userId, paginationDto);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockRedemption]);
      expect(result.meta.totalItems).toBe(1);
    });
  });
});