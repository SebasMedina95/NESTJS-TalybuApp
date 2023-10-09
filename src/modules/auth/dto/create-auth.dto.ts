import { IsBoolean,
         IsDate,
         IsEmail,
         IsIn,
         IsOptional,
         IsString,
         Matches,
         MaxLength,
         MinLength } from "class-validator";


export class CreateAuthDto {
    
    @IsString()
    @MinLength(6)
    public document: string;
    
    @IsIn(['CC', 'CE', 'TI', 'LM', 'PS'])
    public typeDocument: string;
    
    @IsString()
    @MinLength(3)
    public fullName: string;
    
    @IsString()
    @IsOptional()
    public phone: string;
    
    @IsString()
    @IsOptional()
    public address: string;
    
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
    
    @IsBoolean()
    @IsOptional()
    public status: boolean;
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    public createUserAt: string;

    @IsDate()
    @IsOptional()
    public createDateAt: Date;

    @IsString()
    @MinLength(1)
    @IsOptional()
    public updateUserAt: string;

    @IsDate()
    @IsOptional()
    public updateDateAt: Date;

}
