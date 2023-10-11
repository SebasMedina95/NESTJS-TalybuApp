import { ApiProperty } from "@nestjs/swagger";
import { IsDate,
         IsOptional,
         IsString,
         MaxLength,
         MinLength } from "class-validator"

export class CreateImageDto {

    @ApiProperty({ description: 'Url de la imagen', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(300)
    public url: string;

    @ApiProperty({ description: 'Usuario que creó la imagen', nullable: false })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    public createUserAt: string;

    @ApiProperty({ description: 'Fecha en que se creó la imagen', nullable: false })
    @IsDate()
    @IsOptional()
    public createDateAt: Date;

    @ApiProperty({ description: 'Temática a la que se asocia la imagen', nullable: false })
    @IsString()
    public thematic: string;

}

