import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'Beto', description: 'The username of the user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  password: string;
}
