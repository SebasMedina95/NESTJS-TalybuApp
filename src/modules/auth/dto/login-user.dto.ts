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

    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
    })
    public password: string;

}
