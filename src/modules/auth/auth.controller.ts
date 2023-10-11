import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         Res,
         HttpStatus,
         ParseUUIDPipe,
         Req,
         Query} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { IUserRoles, IUserAuth } from './interfaces/user.interface';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PaginationDto } from '../../global/pagination/dto/pagination.dto';

import { EValidRoles } from './constants/valid-roles';
import { Auth } from './decorators/auth.decorator';

@ApiTags('Usuarios')
@Controller('users')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Post('create')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  @ApiResponse({status: 201, description: "Usuario creado correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo crear el Usuario"})
  @ApiResponse({status: 401, description: "No tiene permisos para crear un usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async create(
      @Res() response,
      @Body() createAuthDto: CreateAuthDto) {

    const result = await this.authService.create(createAuthDto);

    if(result.operation.code === "OK"){
      
      return response.status(HttpStatus.CREATED).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @ApiResponse({status: 200, description: "Usuario logeado correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo logear el Usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  @Post('login')
  async login(
      @Res() response,
      @Body() loginUserDto: LoginUserDto){

    const result = await this.authService.login(loginUserDto);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else if(result.operation.code === "FAIL"){

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }else{

      return response.status(HttpStatus.UNAUTHORIZED).send(result);

    }

  }

  @Post('check-status')
  @Auth()
  @ApiResponse({status: 200, description: "Usuario re logeado correctamente", type: Auth })
  @ApiResponse({status: 400, description: "No se pudo re logear el Usuario"})
  @ApiResponse({status: 401, description: "No tiene permisos para re logear un usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async checkAuthStatus(
    @Req() request,
    @Res() response){

    const result = await this.authService.checkAuthStatus(request.user);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Patch('admin-roles/:id')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  @ApiResponse({status: 200, description: "Roles de Usuario actualizados correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo actualizar los roles el Usuario"})
  @ApiResponse({status: 401, description: "No tiene permisos para actualizar roles de un usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async updateRoles(
      @Req() request,
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateRolesAuthDto: IUserRoles){

    const result = await this.authService.updateRoles(id, updateRolesAuthDto, request.user);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get('list')
  @Auth( EValidRoles.ADMIN, 
         EValidRoles.DEV, 
         EValidRoles.SUPER_USER )
  @ApiResponse({status: 200, description: "Listado de usuarios generado correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo generar listado de Usuarios"})
  @ApiResponse({status: 401, description: "No tiene permisos para generar listado de usuarios"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findAll(
    @Res() response,
    @Query() paginationDto: PaginationDto) {

    const result = await this.authService.findAll(paginationDto);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get('get-by-id/:id')
  @Auth(
    EValidRoles.ADMIN,
    EValidRoles.DEV,
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Usuario obtenido por ID correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo obtener por ID el Usuario"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener por ID un usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOne(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.authService.findOne(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Patch(':id')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  update(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateAuthDto: UpdateAuthDto) {

    return this.authService.update(id, updateAuthDto);

  }

  @Patch('delete/:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Usuario eliminado lógicamente correctamente", type: Auth})
  @ApiResponse({status: 400, description: "No se pudo eliminar lógicamente el Usuario"})
  @ApiResponse({status: 401, description: "No tiene permisos para eliminar lógicamente un usuario"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async remove(
      @Req() request,
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.authService.remove(id, request);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }
}
