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

import { ThematicsService } from '../services/thematics.service';

import { CreateThematicDto } from '../dto/creates/create-thematic.dto';
import { UpdateThematicDto } from '../dto/updates/update-thematic.dto';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { EValidRoles } from '../../auth/constants/valid-roles';


@Controller('thematics')
export class ThematicsController {

  constructor(private readonly thematicsService: ThematicsService) { }

  @Post('create')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
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
