import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsIn,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";


export class LoginUserDto {

    @ApiProperty({ description: 'Email del usuario', nullable: false, minLength: 1 })
    @IsString()
    @IsEmail()
    public email: string;

    @ApiProperty({ description: 'Password del usuario', nullable: false, minLength: 6 })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    public password: string;

}
