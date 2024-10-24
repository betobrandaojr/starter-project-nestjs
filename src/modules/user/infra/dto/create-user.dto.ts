import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  password: string;
}
