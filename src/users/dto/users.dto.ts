import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';


export class CreateUserDto {
    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    nickname: string 
}

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    nickname: string 
}