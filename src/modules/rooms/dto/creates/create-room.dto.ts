import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean,
         IsDate,
         IsIn,
         IsNumber,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator";

export class CreateRoomDto {

    @ApiProperty({ description: 'Número de la habitación', nullable: false })
    @IsNumber()
    @IsOptional()
    public number: number;

    @ApiProperty({ description: 'Descripción de la habitación', nullable: false })
    @IsString()
    @IsOptional()
    public description: string;

    @ApiProperty({ description: 'Tipo de la habitación', nullable: false })
    @IsIn(['N', 'S', 'E', 'O', 'D'])
    @IsOptional()
    public type: string;

    @ApiProperty({ description: 'Estado de la habitación', nullable: false, default: true })
    @IsBoolean()
    @IsOptional()
    public status: boolean;

    @ApiProperty({ description: 'Usuario que creó la habitación', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    @IsOptional()
    public createUserAt?: string;

    @ApiProperty({ description: 'Fecha en que se creó la habitación', nullable: false })
    @IsDate()
    @IsOptional()
    public createDateAt?: Date;

    @ApiProperty({ description: 'Temática a la que pertenece la habitación', nullable: false })
    @IsString()
    public thematic: string;

}
