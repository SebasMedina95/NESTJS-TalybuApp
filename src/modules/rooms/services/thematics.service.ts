import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateThematicDto } from '../dto/creates/create-thematic.dto';
import { UpdateThematicDto } from '../dto/updates/update-thematic.dto';
import { PaginationDto } from '../../../global/pagination/dto/pagination.dto';

import { Thematic } from '../entities/thematic.entity';
import { ThematicsComfortsMaster } from '../entities/thematics-comforts.entity';
import { Comfort } from '../entities/comfort.entity';

import {
  IComfortsMini,
  IThematic,
  IThematicList,
  IThematicTrasactionCreate,
  IThematicUpdateRequest,
  IThematicWithComforts
} from '../interfaces/thematics.interfaces';

import {
  Repository,
  DataSource
} from 'typeorm';

import { ApiResponse } from '../../../utils/ApiResponse';
import { EResponseCodes } from '../../../constants/ResponseCodesEnum';
import { MySqlErrorsExceptions } from 'src/helpers/exceptions-sql';
import { IComfort } from '../interfaces/comforts.interfaces';


@Injectable()
export class ThematicsService {

  private readonly logger = new Logger('ThematicsService')
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(Thematic) private readonly thematicRepository: Repository<Thematic>,
    @InjectRepository(ThematicsComfortsMaster) private readonly detailComfortthematicRepository: Repository<ThematicsComfortsMaster>,
    @InjectRepository(Comfort) private readonly comfortRepository: Repository<Comfort>,
    private readonly dataSource: DataSource,

  ) { }

  async create(createThematicDto: CreateThematicDto, request: Express.Request): Promise<ApiResponse<IThematic | IThematicTrasactionCreate | string>> {

    try {

      //* Decodificación JSON para acción
      const dataUtilLog: any = request;
      const documentLogin: string = dataUtilLog.data.document;
      const createDateAt: Date = new Date();
      
      const resThematic = this.thematicRepository.create({ 
        ...createThematicDto,
        createUserAt: documentLogin,
        createDateAt: createDateAt,
        updateUserAt: documentLogin,
        updateDateAt: createDateAt,
      });

      await this.thematicRepository.save(resThematic);

      //* Vamos a crear de una vez el registro de comodidades.
      const idThematic: string = resThematic.id;
      const getMyComforts: IComfort[] = [];
      const listComforts: string[] = createThematicDto.comfortsList;

      if( listComforts && listComforts.length > 0 ){

        const limit: number = createThematicDto.comfortsList.length;

        for( let i = 0 ; i < limit ; i++ ){

          const searchComfort = await this.comfortRepository.findOne({
            where: { id : listComforts[i] }
          })

          const newObjComfort = {
            id: searchComfort.id,
            comfort: searchComfort.comfort,
            status: searchComfort.status
          }

          getMyComforts.push(newObjComfort);

          const newObjDetailed = {
            thematic: idThematic,
            comfort: listComforts[i]
          }

          const resComforts = this.detailComfortthematicRepository.create({ ... newObjDetailed });
          await this.detailComfortthematicRepository.save(resComforts);

        }    

      }

      const completeTransaction: IThematicTrasactionCreate = {
        thematic: resThematic,
        comfort: getMyComforts
      }

      return new ApiResponse(
        completeTransaction,
        EResponseCodes.OK,
        "Temática Creada Correctamente."
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

  async findAll(paginationDto: PaginationDto): Promise<ApiResponse<IThematicList>> {

    const { limit = 10, offset = 1 } = paginationDto;

    //* Me traigo los detalles de la tabla maestra
    const result_detail: any = await this.detailComfortthematicRepository.find({
      relations: {
        thematic: true,
        comfort: true
      }
    });

    //* Me traigo normal las temáticas y paginadas
    const [items, totalCount] = await this.thematicRepository.findAndCount({
      take: limit,
      skip: limit * (offset - 1),
      order: {
        thematic: 'ASC'
      }
      
    });

    //* Defino arrays de control para adecuar la combinación de los detalles y las temáticas
    let arrayComforts: IComfortsMini[] = [];
    let newThematicList: IThematicWithComforts[] = [];

    //* Con ciclos anidados recorroy  valido los detalles que estén asociados a las temátcias
    //*¨si tenemos asociación, guardamos la data para acomodarla a una estructura de salida
    for (const i of items) {
      
      for (const j of result_detail) {
        
        if( i.id === j.thematic.id ){

          const objComfort = {

            idComfort: j.comfort.id,
            comfort: j.comfort.comfort

          }

          arrayComforts.push(objComfort)

        }
        
      }

      const objNew = {

        thematic: i,
        comforts: arrayComforts

      }

      //* Guardo el nuevo objeto en un array
      newThematicList.push(objNew);
      arrayComforts = [];

    }

    //* Calculo sobre las temáticas como tabla fuerte
    const totalPages: number = Math.ceil(totalCount / (limit));

    if (!items || items.length <= 0) {

      return new ApiResponse(
        null,
        EResponseCodes.OK,
        "Listado de Temáticas Vacía."
      );

    }

    //* Adecuo resultados para paginación
    const result: IThematicList | any = {
      items: newThematicList,
      page: offset,
      perPage: limit,
      totalData: totalCount,
      totalPages: totalPages
    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Listado de Temáticas."
    );

  }

  async findOne(id: string): Promise<ApiResponse<IThematic>> {

    const result = await this.thematicRepository.findOne({
      where: { "id": id }
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Temática."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Temática Obtenida."
    );

  }

  async findByTerms(paginationDto: PaginationDto): Promise<ApiResponse<IThematicList>> {

    const { limit = 10,
      offset = 1,
      termString = ""
    } = paginationDto;

    //? Resulta mejor hacerlo con createQueryBuilder para manejar todas las condiciones
    //? que podemos tener de consulta, sin embargo, find nos sirve muy bien también.

    const myTerm: string = termString.toLowerCase();
    const data = await this.thematicRepository
      .createQueryBuilder("thema")
      .where(`LOWER(thema.thematic) LIKE :search`, { search: `%${myTerm}%` })
      .orWhere(`LOWER(thema.description) LIKE :search`, { search: `%${myTerm}%` })
      .orWhere(`LOWER(thema.size) LIKE :search`, { search: `%${myTerm}%` })
      .orWhere(`LOWER(thema.categories) LIKE :search`, { search: `%${myTerm}%` })
      .orderBy(`thema.thematic`, `ASC`)
      .take(limit)
      .skip(limit * (offset - 1))
      .getMany()

    const totalCount: number = data.length;
    const totalPages: number = Math.ceil(totalCount / (limit));

    const result: IThematicList = {
      items: data,
      page: offset,
      perPage: limit,
      totalData: totalCount,
      totalPages : totalPages
    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Listado de Temáticas."
    );

  }

  async update(id: string, 
               updateThematicDto: UpdateThematicDto, 
               request: Express.Request): Promise<ApiResponse<IThematic | string | IThematicUpdateRequest>> {

    const thematic = await this.thematicRepository.findOne({
      where : { "id" : id }
    });

    if( !thematic ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Temática para Eliminación(Lógica)."
      );

    }
    
    //* Decodificación JSON para acción
    const dataUtilLog: any = request;
    const documentLogin: string = dataUtilLog.data.document;
    const updateDateAt: Date = new Date();

    try {

      //* Validamos primero si nos viene el objeto con datos
      if( updateThematicDto.comfortsList.length > 0 || updateThematicDto.comfortsList ){
        
        //* Ahora eliminemos las comodidades para registrar actualización
        const resComforts: ThematicsComfortsMaster[] = await this.detailComfortthematicRepository.find({
          relations: { 
            thematic: true,
            comfort: true
          },
          where: {
            thematic : { id : id }
          },
        });
  
        await this.detailComfortthematicRepository.remove( resComforts );

        //* Registremos nuevamente las comodidades
        updateThematicDto.comfortsList.forEach( async(com) => {

          const newObjDetailed = {
            thematic: id,
            comfort: com
          }

          const resComforts = this.detailComfortthematicRepository.create({ ... newObjDetailed });
          await this.detailComfortthematicRepository.save(resComforts);

        })

      }

      const resThematic = await this.thematicRepository.preload({ 
        id, 
        ...updateThematicDto,
        updateUserAt: documentLogin,
        updateDateAt: updateDateAt ,
      });

      await this.thematicRepository.save( resThematic );

      if( !resThematic ){

        return new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "Error, no se pudo Actualizar la Temática."
        );

      }

      const result = {
        resThematic,
        comforts: updateThematicDto.comfortsList,
      }

      return new ApiResponse(
        result,
        EResponseCodes.OK,
        "Temática Actualizada Correctamente."
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

  async remove(id: string): Promise<ApiResponse<IThematic>> {
    
    const thematic = await this.thematicRepository.findOne({
      where : { "id" : id }
    });

    if( !thematic ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Comodidad para Eliminación(Lógica)."
      );

    }

    const resThematic = await this.thematicRepository.preload({ id, status: false });
    await this.thematicRepository.save( resThematic );

    if( !resThematic ){

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "Error, no se pudo Eliminar(Lógicamente) la Temática."
      );

    }

    return new ApiResponse(
      resThematic,
      EResponseCodes.OK,
      "Temática Eliminada(Lógicamente) Correctamente."
    );

  }

}
