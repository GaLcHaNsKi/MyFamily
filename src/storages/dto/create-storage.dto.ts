import { IsString } from "class-validator"

export class CreateStorageDto {
    @IsString()
    name: string

    @IsString()
    baseUrl: string
}
