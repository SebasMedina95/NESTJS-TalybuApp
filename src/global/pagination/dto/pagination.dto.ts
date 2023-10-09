import { Type } from "class-transformer";
import { IsOptional,
         IsPositive,
         MinLength} from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number ) //EnableImplicitConversions: true
    limit?: number;


    @IsOptional()
    @Type( () => Number ) //EnableImplicitConversions: true
    offset?: number;

    //?Parámetros de Filtro Dinámicos

    @IsOptional()
    @MinLength(1)
    @Type( () => String )
    termString?: string;

    @IsOptional()
    @MinLength(1)
    @Type( () => String )
    termNumber?: number;

}