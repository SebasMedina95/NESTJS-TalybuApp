import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional,
         IsPositive,
         MinLength} from "class-validator";

export class PaginationDto {

    @ApiProperty({ default: 10 , description: 'Cuantas filas necesitas' })
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) //EnableImplicitConversions: true
    limit?: number;

    @ApiProperty({ default: 1 , description: 'En cual página estará posicionado' })
    @IsOptional()
    @Type( () => Number ) //EnableImplicitConversions: true
    offset?: number;

    //?Parámetros de Filtro Dinámicos

    @ApiProperty({ required: false,  description: 'Término opcional de búsqueda tipo String' })
    @IsOptional()
    @MinLength(1)
    @Type( () => String )
    termString?: string;

    @ApiProperty({ required: false,  description: 'Término opcional de búsqueda tipo Number' })
    @IsOptional()
    @MinLength(1)
    @Type( () => String )
    termNumber?: number;

}