import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user1', description: 'User nickname' })
  nickname: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
} 