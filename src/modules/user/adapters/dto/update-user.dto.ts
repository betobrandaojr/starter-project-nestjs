// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'O ID do cliente',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  customerId?: number;

  @ApiProperty({
    description: 'O nome do usuário',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'O nome de usuário (username)',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'O username é obrigatório' })
  @MinLength(5, { message: 'O username deve ter pelo menos 5 caracteres' })
  @MaxLength(20, { message: 'O username não pode ter mais que 20 caracteres' })
  username: string;

  @ApiProperty({
    description: 'O email do usuário',
    type: String,
    required: true,
  })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @MaxLength(20, { message: 'A senha não pode ter mais que 20 caracteres' })
  password: string;
}
