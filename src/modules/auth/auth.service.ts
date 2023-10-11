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
         IUserList, 
         IUserRoles } from './interfaces/user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

import { MySqlErrorsExceptions } from '../../helpers/exceptions-sql';
import { ApiResponse } from '../../utils/ApiResponse';
import { EResponseCodes } from '../../constants/ResponseCodesEnum';
import { PaginationDto } from '../../global/pagination/dto/pagination.dto';

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

  async login(loginUserDto: LoginUserDto): Promise<ApiResponse<IUser | UnauthorizedException | IUserAuth | string>> {

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

  async checkAuthStatus( request: Express.Request ): Promise<ApiResponse<IUser | UnauthorizedException | IUserAuth | string>> {

    try {

      const dataUtilLog: any = request;
      console.log(dataUtilLog.data);

      const user = await this.userRepository.findOne({
        where: { id : dataUtilLog.data.id },
        select: { id: true,
                  fullName: true,
                  email: true,
                  createUserAt: true,
                  createDateAt: true, 
                  password: true }
      });

      const objPayload: IJwtPayload = {
        id: dataUtilLog.data.id,
        fullName: dataUtilLog.data.fullName,
        email: dataUtilLog.data.email,
        createUserAt: user.createUserAt,
        createDateAt: user.createDateAt,
        tokenCreate: new Date()
      }

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
        "No se pudo re logear el Usuario."
      );

    }

  } 

  async updateRoles(id: string, 
                    updateRolesAuthDto: IUserRoles, 
                    request: Express.Request): Promise<ApiResponse<IUser | string>> {
    
    try {
      
      const userRol = await this.userRepository.findOne({
        where : { "id" : id }
      });
  
      if( !userRol ){
  
        return new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "No se encontró Usuario para Actualizar."
        );
  
      }

      //* Decodificación JSON para acción
      const dataUtilLog: any = request;
      const documentLogin: string = dataUtilLog.data.document;
      const updateDateAt: Date = new Date();
      const { roles } = updateRolesAuthDto;

      const resUser = await this.userRepository.preload({ 
        id, 
        roles: roles,
        updateUserAt: documentLogin,
        updateDateAt: updateDateAt,
      });

      await this.userRepository.save( resUser );

      if( !resUser ){

        return new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "Error, no se pudo Actualizar los roles del Usuario."
        );

      }

      return new ApiResponse(
        resUser,
        EResponseCodes.OK,
        "Roles de Usuario Actualizada Correctamente."
      );

    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo actualizar el/los Roles de Usuario."
      );
      
    }
    
  }

  async findAll( paginationDto: PaginationDto ): Promise<ApiResponse<IUserList>> {

    const { limit = 10, offset = 1 } = paginationDto;

    const [items, totalCount] = await this.userRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1),
      order: {
        fullName : 'ASC'
      },
      select: {
        id : true,
        document : true,
        typeDocument : true,
        fullName : true,
        phone : true,
        address : true,
        email : true,
        roles : true,
        createUserAt : true,
        createDateAt : true,
        updateUserAt : true,
        updateDateAt : true
      }
    });

    const totalPages: number = Math.ceil(totalCount / (limit));

    if(!items || items.length <= 0){

      return new ApiResponse(
        null,
        EResponseCodes.OK,
        "Listado de Usuarios Vacía."
      );

    }

    const result: IUserList = {
      items,
      page: offset,
      perPage: limit,
      totalData: totalCount,
      totalPages : totalPages
    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Listado de Usuarios."
    );

  }

  async findOne(id: string): Promise<ApiResponse<IUser>> {

    const result = await this.userRepository.findOne({
      where : { "id" : id },
      select: {
        id : true,
        document : true,
        typeDocument : true,
        fullName : true,
        phone : true,
        address : true,
        email : true,
        roles : true,
        createUserAt : true,
        createDateAt : true,
        updateUserAt : true,
        updateDateAt : true
      }
    })

    if( !result ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Usuario."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Usuario Obtenido."
    );

  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: string, request: Express.Request): Promise<ApiResponse<IUser>> {
    
    const user = await this.userRepository.findOne({
      where : { "id" : id }
    });

    if( !user ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Usuario para Eliminación(Lógica)."
      );

    }
    
    //* Decodificación JSON para acción
    const dataUtilLog: any = request;
    const documentLogin: string = dataUtilLog.document;
    const updateDateAt: Date = new Date();

    const resUser = await this.userRepository.preload({ 
      id, 
      status: false,
      updateUserAt: documentLogin,
      updateDateAt: updateDateAt 
    });

    await this.userRepository.save( resUser );

    if( !resUser ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Error, no se pudo Eliminar(Lógicamente) el Usuario."
      );

    }

    return new ApiResponse(
      resUser,
      EResponseCodes.OK,
      "Usuario Eliminado(Lógicamente) Correctamente."
    );
    
  }

  async getJwtToken( payload: IJwtPayload ): Promise<IJwtPayload | string>{

    const token = this.jwtService.sign( payload );
    return token;

  }

}
