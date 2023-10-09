import { Injectable, 
         Logger, 
         UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, 
         DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';

import { IUser, 
         IUserAuth, 
         IUserRoles } from './interfaces/user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';
import { ApiResponse } from '../../utils/ApiResponse';
import { EResponseCodes } from '../../constants/ResponseCodesEnum';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,

  ){}

  async create(createAuthDto: CreateAuthDto): Promise<ApiResponse<IUser | string>> {

    try {

      const { password, email, ...data } = createAuthDto;
      const resUser = this.userRepository.create({
        ...data,
        email: email.toLowerCase().trim(),
        password: bcrypt.hashSync( password, 15 )
      });
      await this.userRepository.save(resUser);

      //*Removamos el password, no requerimos devolverlo
      delete resUser.password;
      
      return new ApiResponse(
        resUser,
        EResponseCodes.OK,
        "Usuario Creado Correctamente."
      );
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear el Usuario."
      );
      
    }

  }

  async login(loginUserDto: LoginUserDto): Promise<ApiResponse<IUser | UnauthorizedException | IUserAuth | string | any>> {

    try {
      
      const { password, email } = loginUserDto;
      const correo: string = email.toLowerCase().trim();

      const user = await this.userRepository.findOne({
        where: { email : correo },
        select: { id: true,
                  fullName: true,
                  email: true,
                  createUserAt: true,
                  createDateAt: true, 
                  password: true }
      });

      if( !user ){

        return new ApiResponse(
          new UnauthorizedException( "Credenciales no son válidas (email)" ),
          EResponseCodes.UNAUTHORIZED,
          "Fallo de autorización al realizar login."
        );

      }

      if( !bcrypt.compareSync(password, user.password) ){
        
        return new ApiResponse(
          new UnauthorizedException( "Credenciales no son válidas (password)" ),
          EResponseCodes.UNAUTHORIZED,
          "Fallo de autorización al realizar login."
        );

      }

      if( user.status ){

        return new ApiResponse(
          "El usuario no está habilitado para ser usado",
          EResponseCodes.DISABLED,
          "Fallo de autorización al realizar login."
        );

      }

      //* Pasó los filtros, entonces:
      const objPayload: IJwtPayload = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createUserAt: user.createUserAt,
        createDateAt: user.createDateAt,
        tokenCreate: new Date()
      }

      delete user.password;

      const objResult: IUserAuth = {
        user,
        token: await this.getJwtToken(objPayload)
      }
      
      return new ApiResponse(
        objResult,
        EResponseCodes.OK,
        "Login exitoso."
      );

    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo logear el Usuario."
      );
      
    }

  }

  async updateRoles(id: string, updateRolesAuthDto: IUserRoles): Promise<ApiResponse<IUser | string>> {
    
    try {
      


    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo actualizar el/los Roles de Usuario."
      );
      
    }
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  async getJwtToken( payload: IJwtPayload ): Promise<IJwtPayload | string>{

    const token = this.jwtService.sign( payload );
    return token;

  }

}
