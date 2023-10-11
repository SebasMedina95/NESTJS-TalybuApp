import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateComfortDto {

    @ApiProperty({ description: 'Nombre de la comodidad', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    comfort: string;

    @ApiProperty({ description: 'Estado de la comodidad', nullable: false, default: true })
    @IsBoolean()
    @IsOptional()
    status: boolean;

    @ApiProperty({ description: 'Usuario que creó la comodidad', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    createUserAt?: string;

    @ApiProperty({ description: 'Fecha en que se creó la comodidad', nullable: false })
    @IsDate()
    @IsOptional()
    createDateAt?: Date;

    @ApiProperty({ description: 'Usuario que actualizó la comodidad', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    updateUserAt?: string;

    @ApiProperty({ description: 'Fecha en que se actualizó la comodidad', nullable: false })
    @IsDate()
    @IsOptional()
    updateDateAt?: Date;

}
