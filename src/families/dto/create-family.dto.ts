import { IsString } from "class-validator";

export class CreateFamilyDto {
    @IsString()
    family: string
}
