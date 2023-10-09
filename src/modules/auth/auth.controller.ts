import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         Res,
         HttpStatus,
         ParseUUIDPipe} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IUserRoles } from './interfaces/user.interface';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EValidRoles } from './constants/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('users')
export class AuthController {

  constructor(private readonly authService: AuthService) {}


  @Post('create')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
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

  @Patch('admin/roles')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  async updateRoles(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateRolesAuthDto: IUserRoles){

    const result = await this.authService.updateRoles(id, updateRolesAuthDto);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get()
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV, EValidRoles.SUPER_USER )
  findAll(@Res() response) {

    return this.authService.findAll();

  }

  @Get(':id')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV, EValidRoles.SUPER_USER )
  findOne(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string) {

    return this.authService.findOne(id);

  }

  @Patch(':id')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  update(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateAuthDto: UpdateAuthDto) {

    return this.authService.update(id, updateAuthDto);

  }

  @Delete(':id')
  @Auth( EValidRoles.ADMIN, EValidRoles.DEV )
  remove(
      @Res() response,
      @Param('id', ParseUUIDPipe) id: string) {

    return this.authService.remove(id);

  }
}
