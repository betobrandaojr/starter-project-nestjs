import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'teste.teste',
    description: 'The username of the user',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'teste1234',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  password: string;
}
