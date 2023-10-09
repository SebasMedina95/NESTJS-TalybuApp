import { IsArray,
         IsBoolean,
         IsDate,
         IsIn,
         IsNumber,
         IsOptional,
         IsPositive,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateThematicDto {

    @IsString()
    @MinLength(1)
    @MaxLength(150)
    public thematic: string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    public description: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    public size: string;

    @IsIn([
        'paso',
        'hospedaje',
        'motel',
        'mixta',
        'vacaciones',
        'familiar',
        'fiesta'
    ])
    public categories: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    public tags: string[];

    @IsNumber()
    @IsPositive()
    @IsOptional()
    public price: number;

    @IsBoolean()
    @IsOptional()
    public status: boolean;

    @IsBoolean()
    @IsOptional()
    public promotion: boolean;

    @IsNumber()
    @IsOptional()
    public promotionPercentaje: number;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    public createUserAt?: string;

    @IsDate()
    @IsOptional()
    public createDateAt?: Date;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    public updateUserAt?: string;

    @IsDate()
    @IsOptional()
    public updateDateAt?: Date;

    @IsArray()
    @IsOptional()
    public comfortsList: string[];

}
