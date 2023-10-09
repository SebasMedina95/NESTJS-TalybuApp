import { Injectable, 
         Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, 
         Repository } from 'typeorm';

import { IUploadRoomFile } from '../interfaces/uploadFileRoom.interfaces';
import { EResponseCodes } from '../../../constants/ResponseCodesEnum';
import { MySqlErrorsExceptions } from '../../../helpers/exceptions-sql';
import { ApiResponse } from '../../../utils/ApiResponse';

import { ImagesRoom } from '../entities/image.entity';


@Injectable()
export class ImagesService {

  private readonly logger = new Logger('ImagesService');
  private readonly errorsSQL = new MySqlErrorsExceptions();

  constructor(

    @InjectRepository(ImagesRoom) private readonly imagesRoomsRepository: Repository<ImagesRoom>,
    private readonly dataSource: DataSource,

  ) { }

  async create(uploadRoomFile: IUploadRoomFile): Promise<ApiResponse<IUploadRoomFile>> {
    
    const image = this.imagesRoomsRepository.create({
      url: uploadRoomFile.url,
      createUserAt: uploadRoomFile.createUserAt,
      createDateAt: uploadRoomFile.createDateAt,
      thematic: uploadRoomFile.thematic
    });

    await this.imagesRoomsRepository.save( image );

    return new ApiResponse(
      uploadRoomFile,
      EResponseCodes.OK,
      "Imagen Anexada Correctamente a la Temática."
    );
    
  }

  async findOneById(id: string): Promise<ApiResponse<IUploadRoomFile | ImagesRoom>> {
    
    const result = await this.imagesRoomsRepository.findOne({
      where: { "id": id }
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Imagen de Temática."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Imagen de Temática Obtenida."
    );
    
  }

  async findOneByTheme(theme: string): Promise<ApiResponse<IUploadRoomFile[] | ImagesRoom[]>> {
    
    const result = await this.imagesRoomsRepository.find({
      
      relations: { thematic: true },
      where: {
        thematic : { id : theme }
      },
      order: {
        thematic: { id : "DESC" }
      }
      
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Imágenes con esta Temática."
      );

    }

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Lista de Imágenes Encontradas."
    );

  }

  async remove(id: string): Promise<ApiResponse<IUploadRoomFile | ImagesRoom>> {

    const result = await this.imagesRoomsRepository.findOne({
      where: { "id": id }
    });

    if (!result) {

      return new ApiResponse(
        null,
        EResponseCodes.FAIL,
        "No se encontró Imagen de Temática."
      );

    }

    await this.imagesRoomsRepository.remove( result );

    return new ApiResponse(
      result,
      EResponseCodes.OK,
      "Eliminación de Imagen Realizada."
    );

  }

}
