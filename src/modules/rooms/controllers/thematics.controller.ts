import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  Req
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThematicsService } from '../services/thematics.service';

import { CreateThematicDto } from '../dto/creates/create-thematic.dto';
import { UpdateThematicDto } from '../dto/updates/update-thematic.dto';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { EValidRoles } from '../../auth/constants/valid-roles';
import { Thematic } from '../entities/thematic.entity';

@ApiTags('Temáticas Habitación')
@Controller('thematics')
export class ThematicsController {

  constructor(private readonly thematicsService: ThematicsService) { }

  @Post('create')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 201, description: "Temática creada correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo crear temática de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para crear temática de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async create(
    @Req() request,
    @Res() response,
    @Body() createThematicDto: CreateThematicDto) {

    const result = await this.thematicsService.create(createThematicDto, request.user);

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
  @ApiResponse({status: 200, description: "Temática listadas correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo listar temática de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para listar temática de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findAll(
    @Res() response,
    @Query() paginationDto: PaginationDto) {

    const result = await this.thematicsService.findAll(paginationDto);

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
  @ApiResponse({status: 200, description: "Temática obtenida por ID correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo obtener temática por ID de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener temática por ID de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOne(
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.thematicsService.findOne(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get('get-by-term')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER,
    EValidRoles.USER
  )
  @ApiResponse({status: 200, description: "Temática encontrada por término correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo encontrar temática de habitación por término"})
  @ApiResponse({status: 401, description: "No tiene permisos para encontrar temática de habitación por término"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findByTerms(
    @Res() response,
    @Query() paginationDto: PaginationDto) {

    //? Buscar por temática, descripción, tamaño y/o categoría
    const result = await this.thematicsService.findByTerms(paginationDto)

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
  @ApiResponse({status: 200, description: "Temática actualizada correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo actualizar temática de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para actualizar temática de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async update(
    @Req() request,
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThematicDto: UpdateThematicDto) {

    const result = await this.thematicsService.update(id, updateThematicDto, request.user);

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
  @ApiResponse({status: 200, description: "Temática eliminada lógicamente correctamente", type: Thematic})
  @ApiResponse({status: 400, description: "No se pudo eliminar lógicamente la temática de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para eliminar lógicamente la temática de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async remove(
    @Res() response,
    @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.thematicsService.remove(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }
}
