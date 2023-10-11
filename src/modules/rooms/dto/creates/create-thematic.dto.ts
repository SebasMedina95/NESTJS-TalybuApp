import { ApiProperty } from "@nestjs/swagger";
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

    @ApiProperty({ description: 'Temática de la habitación', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(1)
    @MaxLength(150)
    public thematic: string;

    @ApiProperty({ description: 'Descripción de la temática de habitación', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    public description: string;

    @ApiProperty({ description: 'Tamaño temático de la habitación', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    public size: string;

    @ApiProperty({ description: 'Categoría de la temática de habitación', nullable: false })
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

    @ApiProperty({ description: 'Tags representativos de la temática de habitación', nullable: false, default: [] })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    public tags: string[];

    @ApiProperty({ description: 'Precio de la temática de habitación', nullable: false, default: 0 })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    public price: number;

    @ApiProperty({ description: 'Estado de la temática de habitación', nullable: false, default: true })
    @IsBoolean()
    @IsOptional()
    public status: boolean;

    @ApiProperty({ description: 'La temática se encuentra en promoció', nullable: true, default: false })
    @IsBoolean()
    @IsOptional()
    public promotion: boolean;

    @ApiProperty({ description: 'Porcentaje de la promoción', nullable: true, default: 0 })
    @IsNumber()
    @IsOptional()
    public promotionPercentaje: number;

    @ApiProperty({ description: 'Usuario que creó la temática de habitación', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    public createUserAt?: string;

    @ApiProperty({ description: 'Fecha en que se creó la temática habitación', nullable: false })
    @IsDate()
    @IsOptional()
    public createDateAt?: Date;

    @ApiProperty({ description: 'Usuario que actualizó la temática de habitación', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    public updateUserAt?: string;

    @ApiProperty({ description: 'Fecha en que se actualizó la temática de habitación', nullable: false })
    @IsDate()
    @IsOptional()
    public updateDateAt?: Date;

    @ApiProperty({ description: 'Listado de UUID de comodidades', nullable: false, default: [] })
    @IsArray()
    @IsOptional()
    public comfortsList: string[];

}
