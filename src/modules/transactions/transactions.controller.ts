import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsService.create(createTransactionDto);
    return {
      success: true,
      data: transaction,
      message: 'Transaction created successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<any>> {
    return this.transactionsService.findAll(paginationDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get transactions by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<any>> {
    return this.transactionsService.findByUserId(userId, paginationDto);
  }
}