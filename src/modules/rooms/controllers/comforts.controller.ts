import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpStatus,
  ParseUUIDPipe,
  Res,
  Req
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ComfortsService } from '../services/comforts.service';

import { CreateComfortDto } from '../dto/creates/create-comfort.dto';
import { UpdateComfortDto } from '../dto/updates/update-comfort.dto';

import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { EValidRoles } from '../../auth/constants/valid-roles';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { Comfort } from '../entities/comfort.entity';

@ApiTags('Comodidades')
@Controller('comforts')
export class ComfortsController {

  constructor(private readonly comfortsService: ComfortsService) { }

  @Post('create')
  @Auth(
    EValidRoles.ADMIN,
    EValidRoles.DEV,
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 201, description: "Comodidad creada correctamente", type: Comfort})
  @ApiResponse({status: 400, description: "No se pudo crear la comodidad"})
  @ApiResponse({status: 401, description: "No tiene permisos para crear una comodidad"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async create(
    @Req() request,
    @Res() response,
    @Body() createComfortDto: CreateComfortDto) {

    const result = await this.comfortsService.create(createComfortDto, request.user);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.CREATED).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get('list')
  @Auth(
    EValidRoles.ADMIN,
    EValidRoles.DEV,
    EValidRoles.SUPER_USER,
    EValidRoles.USER
  )
  @ApiResponse({status: 200, description: "Listado de comodidades", type: Comfort})
  @ApiResponse({status: 400, description: "No se pudo obtener listados de comodidades"})
  @ApiResponse({status: 401, description: "No tiene permisos para listar comodidades"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findAll(
    @Res() response,
    @Query() paginationDto: PaginationDto) {

    const result = await this.comfortsService.findAll(paginationDto);

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
    EValidRoles.SUPER_USER,
    EValidRoles.USER
  )
  @ApiResponse({status: 200, description: "Comodidad obtenida por ID", type: Comfort})
  @ApiResponse({status: 400, description: "No se pudo obtener la comodidad"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener una comodidad"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOne(
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.comfortsService.findOne(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Patch('update/:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Comodidad actualizada correctamente", type: Comfort})
  @ApiResponse({status: 400, description: "No se pudo actualizar la comodidad"})
  @ApiResponse({status: 401, description: "No tiene permisos para actualizar la comodidad"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async update(
    @Req() request,
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateComfortDto: UpdateComfortDto) {

    const result = await this.comfortsService.update(id, updateComfortDto, request.user);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }


  @Patch('delete/:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Comodidad eliminada lógicamente correctamente", type: Comfort})
  @ApiResponse({status: 400, description: "No se pudo eliminar lógicamente la comodidad"})
  @ApiResponse({status: 401, description: "No tiene permisos para eliminar lógicamente una comodidad"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async remove(
    @Req() request,
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.comfortsService.remove(id, request);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

}
