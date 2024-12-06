import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDTO {
    @ApiProperty({ example: 'title first', description: 'The re' })
    @IsString()
    @MinLength(1)
    title: string

    @IsBoolean()
    @IsNotEmpty()
    status: boolean
}