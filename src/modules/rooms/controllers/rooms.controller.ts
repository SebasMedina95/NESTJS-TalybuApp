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

import { RoomsService } from '../services/rooms.service';

import { CreateRoomDto } from '../dto/creates/create-room.dto';
import { UpdateRoomDto } from '../dto/updates/update-room.dto';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { EValidRoles } from '../../auth/constants/valid-roles';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
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
  async update(
      @Res() response, 
      @Param('id', ParseUUIDPipe) id: string, 
      @Body() updateRoomDto: UpdateRoomDto) {

    const result = await this.roomsService.update(id, updateRoomDto);

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

    const result = await this.roomsService.remove(id);

    if (result.operation.code === "OK") {

      return response.status(HttpStatus.OK).send(result);

    } else {

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }
}
