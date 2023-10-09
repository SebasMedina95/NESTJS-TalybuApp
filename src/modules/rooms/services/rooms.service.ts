import {
  Injectable,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  Repository
} from 'typeorm';

import { CreateRoomDto } from '../dto/creates/create-room.dto';
import { UpdateRoomDto } from '../dto/updates/update-room.dto';

import { IRoom, IRoomList } from '../interfaces/room.interfaces';

import { Room } from '../entities/room.entity';
import { MySqlErrorsExceptions } from '../../../helpers/exceptions-sql';
import { ApiResponse } from '../../../utils/ApiResponse';
import { EResponseCodes } from '../../../constants/ResponseCodesEnum';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';


@Injectable()
export class RoomsService {

  private readonly logger = new Logger('RoomsService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    private readonly dataSource: DataSource,

  ) { }

  async create(createRoomDto: CreateRoomDto, request: Express.Request): Promise<ApiResponse<IRoom>> {

    const room = this.roomsRepository.create({ ...createRoomDto });

    console.log(request);
    //await this.roomsRepository.save( room );

    return new ApiResponse(
      room,
      EResponseCodes.OK,
      "Habitación Anexada Correctamente a la Temática."
    );

  }

  async findAll(paginationDto: PaginationDto) {
    
    const { limit = 10, offset = 1 } = paginationDto;

    const [items, totalCount] = await this.roomsRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1),
      relations: {
        thematic: true
      },
      order: {
        number : 'ASC'
      }
    });

    const totalPages: number = Math.ceil(totalCount / (limit));

    if(!items || items.length <= 0){

      return new ApiResponse(
        null,
        EResponseCodes.OK,
        "Listado de Comodidades Vacía."
      );

    }

    const result: IRoomList = {
      items,
      page: offset,
      perPage: limit,
      totalData: totalCount,
      totalPages : totalPages
    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Listado de Habitaciones con su Temática."
    );
    
  }

  async findOne(id: string): Promise<ApiResponse<IRoom>> {
    
    const result = await this.roomsRepository.findOne({
      where: { "id": id }
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Habitación."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Habitación Obtenida."
    );
    
  }

  async findByThematic(thematic: string | any): Promise<ApiResponse<IRoom[]>> {
    
    const result = await this.roomsRepository.find({
      
      relations: { thematic: true },
      where: {
        thematic : { id : thematic }
      },
      order: {
        thematic: { id : "DESC" }
      }
      
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Habitaciones con esta Temática."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Lista de Habitaciones Encontradas."
    );
    
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<ApiResponse<IRoom | string>> {
    
    const room = await this.roomsRepository.findOne({
      where : { "id" : id }
    });

    if( !room ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Habitación para Eliminación(Lógica)."
      );

    }

    try {
      
      const resRoom = await this.roomsRepository.preload({ id, ...updateRoomDto });
      await this.roomsRepository.save( resRoom );

      if( !resRoom ){

        return new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "Error, no se pudo Actualizar la Habitación."
        );

      }

      return new ApiResponse(
        resRoom,
        EResponseCodes.OK,
        "Habitación Actualizada Correctamente."
      );
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la Habitación."
      );

    }
    
  }

  async remove(id: string): Promise<ApiResponse<IRoom>> {
    
    const room = await this.roomsRepository.findOne({
      where : { "id" : id }
    });

    if( !room ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Habitación para Eliminación(Lógica)."
      );

    }

    const resRoom = await this.roomsRepository.preload({ id, status: false });
    await this.roomsRepository.save( resRoom );

    if( !resRoom ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Error, no se pudo Eliminar(Lógicamente) la Habitación."
      );

    }

    return new ApiResponse(
      resRoom,
      EResponseCodes.OK,
      "Habitación Eliminada(Lógicamente) Correctamente."
    );

  }
}
