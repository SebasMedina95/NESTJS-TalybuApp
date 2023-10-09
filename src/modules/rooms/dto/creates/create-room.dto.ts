import { IsBoolean,
         IsDate,
         IsIn,
         IsNumber,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateRoomDto {

    @IsNumber()
    @IsOptional()
    public number: number;

    @IsString()
    @IsOptional()
    public description: string;

    @IsIn(['N', 'S', 'E', 'O', 'D'])
    @IsOptional()
    public type: string;

    @IsBoolean()
    @IsOptional()
    public status: boolean;

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
