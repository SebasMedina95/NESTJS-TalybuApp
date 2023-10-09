import { Injectable, 
         Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, 
         DataSource } from 'typeorm';

import { IComfort, IComfortList } from '../interfaces/comforts.interfaces';
import { CreateComfortDto } from '../dto/creates/create-comfort.dto';
import { UpdateComfortDto } from '../dto/updates/update-comfort.dto';

import { Comfort } from '../entities/comfort.entity';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';
import { ApiResponse } from '../../../utils/ApiResponse';
import { EResponseCodes } from '../../../constants/ResponseCodesEnum';
import { MySqlErrorsExceptions } from '../../../helpers/exceptions-sql';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../auth/entities/user.entity';


@Injectable()
export class ComfortsService {

  private readonly logger = new Logger('ComfortsService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(Comfort) private readonly comfortRepository: Repository<IComfort>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,

  ){}

  async create(createComfortDto: CreateComfortDto, request: Express.Request): Promise<ApiResponse<IComfort | string>> {

    try {

      //* Decodificación JSON para acción
      const dataUtilLog: any = request;
      const documentLogin: string = dataUtilLog.data.document;
      const createDateAt: Date = new Date();

      const resComfort = this.comfortRepository.create({ 
        ...createComfortDto,
        createUserAt: documentLogin,
        createDateAt: createDateAt,
        updateUserAt: documentLogin,
        updateDateAt: createDateAt,
      });
      
      await this.comfortRepository.save(resComfort);
      
      return new ApiResponse(
        resComfort,
        EResponseCodes.OK,
        "Comodidad Creada Correctamente."
      );
      
    } catch (error) {
      
      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la temática."
      );
      
    }

  }

  async findAll( paginationDto: PaginationDto ): Promise<ApiResponse<IComfortList>> {
    
    const { limit = 10, offset = 1 } = paginationDto;

    const [items, totalCount] = await this.comfortRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1),
      order: {
        comfort : 'ASC'
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

    const result: IComfortList = {
      items,
      page: offset,
      perPage: limit,
      totalData: totalCount,
      totalPages : totalPages
    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Listado de Comodidades."
    );
    
  }

  async findOne(id: string ): Promise<ApiResponse<IComfort>> {

    const result = await this.comfortRepository.findOne({
      where : { "id" : id }
    })

    if( !result ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Comodidad."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Comodidad Obtenida."
    );

  }

  async update(id: string, updateComfortDto: UpdateComfortDto, request: Express.Request): Promise<ApiResponse<IComfort | string>> {
    
    const comfort = await this.comfortRepository.findOne({
      where : { "id" : id }
    });

    if( !comfort ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Comodidad para Actualizar."
      );

    }

    //* Decodificación JSON para acción
    const dataUtilLog: any = request;
    const documentLogin: string = dataUtilLog.data.document;
    const updateDateAt: Date = new Date();

    try {
      
      const resComfort = await this.comfortRepository.preload({ 
        id, 
        ...updateComfortDto,
        updateUserAt: documentLogin,
        updateDateAt: updateDateAt 
      });

      await this.comfortRepository.save( resComfort );

      if( !resComfort ){

        return new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "Error, no se pudo Actualizar la Comodidad."
        );

      }

      return new ApiResponse(
        resComfort,
        EResponseCodes.OK,
        "Comodidad Actualizada Correctamente."
      );

    } catch (error) {

      const fail: string = await this.errorsSQL.handleDbExceptions(error);

      return new ApiResponse(
        fail,
        EResponseCodes.FAIL,
        "No se pudo crear la temática."
      );
      
    }

  }

  async remove(id: string, request: Express.Request): Promise<ApiResponse<IComfort>> {

    const comfort = await this.comfortRepository.findOne({
      where : { "id" : id }
    });

    if( !comfort ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Comodidad para Eliminación(Lógica)."
      );

    }
    
    //* Decodificación JSON para acción
    const dataUtilLog: any = request;
    const documentLogin: string = dataUtilLog.document;
    const updateDateAt: Date = new Date();


    const resComfort = await this.comfortRepository.preload({ 
      id, 
      status: false,
      updateUserAt: documentLogin,
      updateDateAt: updateDateAt 
    });
    await this.comfortRepository.save( resComfort );

    if( !resComfort ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Error, no se pudo Eliminar(Lógicamente) la Comodidad."
      );

    }

    return new ApiResponse(
      resComfort,
      EResponseCodes.OK,
      "Comodidad Eliminada(Lógicamente) Correctamente."
    );

  }

}
