import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';

@ApiTags('rewards')
@Controller('rewards')
export class RewardsController {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get('points/:userId')
  @ApiOperation({ summary: 'Get total reward points for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Total points retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { 
          type: 'object',
          properties: {
            userId: { type: 'string' },
            totalPoints: { type: 'number' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getPoints(@Param('userId') userId: string) {
    const totalPoints = await this.rewardsService.getPointsByUserId(userId);
    return {
      success: true,
      data: {
        userId,
        totalPoints,
      },
    };
  }

  @Get('transactions/:userId')
  @ApiOperation({ summary: 'Get reward transactions for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Transactions retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getTransactions(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<any>> {
    return this.transactionsService.findByUserId(userId, paginationDto);
  }
}