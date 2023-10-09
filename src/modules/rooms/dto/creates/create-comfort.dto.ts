import { IsBoolean, IsDate,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateComfortDto {

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    comfort: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    createUserAt?: string;

    @IsDate()
    @IsOptional()
    createDateAt?: Date;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    updateUserAt?: string;

    @IsDate()
    @IsOptional()
    updateDateAt?: Date;

}
