import { IsDate,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator"

export class CreateImageDto {

    @IsString()
    @MinLength(1)
    @MaxLength(300)
    public url: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    public createUserAt: string;

    @IsDate()
    @IsOptional()
    public createDateAt: Date;

    @IsString()
    public thematic: string;

}

