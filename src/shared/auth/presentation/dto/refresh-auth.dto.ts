import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshAuthDto {
  @ApiProperty({
    example: 'Token Here',
    description: 'Refresh token to get a new access token',
  })
  @IsNotEmpty()
  refresh_token: string;
}
