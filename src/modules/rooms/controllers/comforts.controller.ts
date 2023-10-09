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

import { ComfortsService } from '../services/comforts.service';

import { CreateComfortDto } from '../dto/creates/create-comfort.dto';
import { UpdateComfortDto } from '../dto/updates/update-comfort.dto';

import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { EValidRoles } from '../../auth/constants/valid-roles';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@Controller('comforts')
export class ComfortsController {

  constructor(private readonly comfortsService: ComfortsService) { }

  @Post('create')
  @Auth(
    EValidRoles.ADMIN,
    EValidRoles.DEV,
    EValidRoles.SUPER_USER
  )
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
