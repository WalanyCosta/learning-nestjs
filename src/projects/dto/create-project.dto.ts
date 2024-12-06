import { IsEmpty, IsNotEmpty, IsString, minLength } from "class-validator";

export class CreateProjectDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description?: string
}