import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean,
         IsDate,
         IsEmail,
         IsIn,
         IsOptional,
         IsString,
         Matches,
         MaxLength,
         MinLength } from "class-validator";


export class CreateAuthDto {
    
    @ApiProperty({ description: 'Documento del usuario', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(6)
    public document: string;
    
    @ApiProperty({ description: 'Tipo Documento del usuario', nullable: false, minLength: 2, default: "CC" })
    @IsIn(['CC', 'CE', 'TI', 'LM', 'PS'])
    public typeDocument: string;
    
    @ApiProperty({ description: 'Nombre completo del usuario', nullable: false, minLength: 1 })
    @IsString()
    @MinLength(3)
    public fullName: string;
    
    @ApiProperty({ description: 'Teléfono del usuario', nullable: true, minLength: 1 })
    @IsString()
    @IsOptional()
    public phone: string;
    
    @ApiProperty({ description: 'Dirección Residencial del usuario', nullable: true, minLength: 1 })
    @IsString()
    @IsOptional()
    public address: string;
    
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

    @ApiProperty({ description: 'Roles del usuario', nullable: false, minLength: 1, default: [] })
    @IsArray()
    @IsOptional()
    public roles: string[];
    
    @ApiProperty({ description: 'Estado del usuario', nullable: false, minLength: 1, default: true })
    @IsBoolean()
    @IsOptional()
    public status: boolean;
    
    @ApiProperty({ description: 'Usuario que creó al usuario', nullable: false })
    @IsString()
    @MinLength(1)
    @IsOptional()
    public createUserAt: string;

    @ApiProperty({ description: 'Fecha en que se creó el usuario', nullable: false })
    @IsDate()
    @IsOptional()
    public createDateAt: Date;

    @ApiProperty({ description: 'Usuario que actualizó el usuario', nullable: false })
    @IsString()
    @MinLength(1)
    @IsOptional()
    public updateUserAt: string;

    @ApiProperty({ description: 'Fecha en que se actuyalizó el usuario', nullable: false })
    @IsDate()
    @IsOptional()
    public updateDateAt: Date;

}
