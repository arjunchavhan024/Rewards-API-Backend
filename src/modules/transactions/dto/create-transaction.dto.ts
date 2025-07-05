import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Transaction amount', minimum: 0 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Transaction category' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ description: 'Points earned from transaction', minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsEarned?: number;
}