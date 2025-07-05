import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RedemptionsService } from './redemptions.service';
import { RedeemPointsDto } from './dto/redeem-points.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';

@ApiTags('redemptions')
@Controller('redemptions')
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}

  @Post('redeem')
  @ApiOperation({ summary: 'Redeem reward points' })
  @ApiResponse({ status: 201, description: 'Points redeemed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request or insufficient points' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async redeemPoints(@Body() redeemPointsDto: RedeemPointsDto) {
    const redemption = await this.redemptionsService.redeemPoints(redeemPointsDto);
    return {
      success: true,
      data: redemption,
      message: 'Points redeemed successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all redemptions' })
  @ApiResponse({ status: 200, description: 'Redemptions retrieved successfully' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<any>> {
    return this.redemptionsService.findAll(paginationDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get redemptions by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Redemptions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<any>> {
    return this.redemptionsService.findByUserId(userId, paginationDto);
  }
}