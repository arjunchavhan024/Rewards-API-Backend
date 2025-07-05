import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ 
    description: 'Page number',
    minimum: 1,
    default: 1,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiProperty({ 
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit: number = 10;
}