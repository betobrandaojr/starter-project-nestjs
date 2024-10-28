import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserFilterInput {
  @ApiPropertyOptional({
    description: 'Filtro pelo ID do registro',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;

  @ApiPropertyOptional({
    description: 'Filtro pelo ID do cliente',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customerId?: number;

  @ApiPropertyOptional({
    description: 'Filtro pelo nome de usuário (username)',
    type: String,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Filtro pelo email',
    type: String,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'Data de início para filtro de criação (formato ISO 8601)',
    type: String,
    format: 'date-time',
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAtFrom?: Date;

  @ApiPropertyOptional({
    description: 'Data de fim para filtro de criação (formato ISO 8601)',
    type: String,
    format: 'date-time',
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAtTo?: Date;

  @ApiPropertyOptional({
    description: 'Número da página para paginação (mínimo 1)',
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limite de itens por página (mínimo 1)',
    type: Number,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo para ordenar os resultados',
    enum: ['id', 'customerId', 'username', 'email', 'createdAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  @IsIn(['id', 'customerId', 'username', 'email', 'createdAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Ordem de classificação',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}
