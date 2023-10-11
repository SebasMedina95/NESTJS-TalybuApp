import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         ParseUUIDPipe,
         Res,
         Query,
         HttpStatus,
         Req} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoomsService } from '../services/rooms.service';

import { CreateRoomDto } from '../dto/creates/create-room.dto';
import { UpdateRoomDto } from '../dto/updates/update-room.dto';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';

import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { EValidRoles } from '../../auth/constants/valid-roles';
import { Room } from '../entities/room.entity';

@ApiTags('Habitaciones')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 201, description: "Habitación creada correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo crear la habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para crear una habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async create(
    @Req() request,
    @Res() response, 
    @Body() createRoomDto: CreateRoomDto) {

    const result = await this.roomsService.create(createRoomDto, request.user);

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
  @ApiResponse({status: 200, description: "Listado habitaciones obtenida correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo obtener listado habitaciones"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener listado habitaciones"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findAll(
    @Res() response,
    @Query() paginationDto: PaginationDto) {

      const result = await this.roomsService.findAll(paginationDto);

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
  @ApiResponse({status: 200, description: "Habitación por ID obtenida correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo obtener Habitación por ID"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener listado habitaciones"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOne(
    @Res() response, 
    @Param('id', ParseUUIDPipe) id: string) {

      const result = await this.roomsService.findOne(id);

      if (result.operation.code === "OK") {

        return response.status(HttpStatus.OK).send(result);
  
      } else {
  
        return response.status(HttpStatus.NOT_FOUND).send(result);
  
      }

  }

  @Get('get-by-thematic/:thematic')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER,
    EValidRoles.USER
  )
  @ApiResponse({status: 200, description: "Habitaciones por temática obtenidas correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo obtener Habitaciones por temática"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener Habitaciones por temática"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findByThematic(
    @Res() response, 
    @Param('thematic', ParseUUIDPipe) thematic: string) {

      const result = await this.roomsService.findByThematic(thematic);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Patch('update:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Actualización de habitación realizada correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo actualizar habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para actualizar la habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async update(
      @Req() request,
      @Res() response, 
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateRoomDto: UpdateRoomDto) {

    const result = await this.roomsService.update(id, updateRoomDto, request.user);

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
  @ApiResponse({status: 200, description: "Eliminación lógica realizada correctamente", type: Room})
  @ApiResponse({status: 400, description: "No se pudo realizar eliminación lógica de habitación"})
  @ApiResponse({status: 401, description: "No tiene permisos para realizar eliminación lógica de habitación"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async remove(
      @Res() response, 
      @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.roomsService.remove(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }
}
