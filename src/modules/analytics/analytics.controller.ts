import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('rewards-distribution')
  @ApiOperation({ summary: 'Get rewards distribution analytics' })
  @ApiResponse({ 
    status: 200, 
    description: 'Analytics data retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            categoryDistribution: { type: 'array' },
            redemptionStats: { type: 'array' },
            overallStats: { type: 'object' }
          }
        }
      }
    }
  })
  async getRewardsDistribution() {
    return this.analyticsService.getRewardsDistribution();
  }
}