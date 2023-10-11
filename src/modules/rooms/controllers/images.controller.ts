import { FileInterceptor } from '@nestjs/platform-express';

import { Controller,
         Get,
         Post,
         Body,
         Param,
         Delete, 
         UseInterceptors,
         UploadedFile,
         ParseFilePipe,
         MaxFileSizeValidator,
         FileTypeValidator,
         ParseUUIDPipe,
         Res,
         HttpStatus} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../services/images.service';

import { FilesService } from '../../../global/files/files.service';
import { IUploadRoomFile } from '../interfaces/uploadFileRoom.interfaces';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { EValidRoles } from '../../auth/constants/valid-roles';
import { ImagesRoom } from '../entities/image.entity';

@ApiTags('Imágenes Habitación')
@Controller('images-rooms')
export class ImagesController {

  constructor(
    private readonly imagesService: ImagesService,
    private readonly cloudinaryService: FilesService
  ) {}

  @Post('upload')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 201, description: "Imagen temática creada correctamente", type: ImagesRoom})
  @ApiResponse({status: 400, description: "No se pudo crear la imagen"})
  @ApiResponse({status: 401, description: "No tiene permisos para crear una imagen"})
  @ApiResponse({status: 403, description: "Token invalido"})
  @UseInterceptors( FileInterceptor('roomImageFile'))
  //Método
  uploadFileRooms(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), //4 MB
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ]
      }),
    ) file: Express.Multer.File, @Body() body: IUploadRoomFile) {

      let url_cloudinary: string = "";
      let executeFile = this.cloudinaryService.uploadFile(file);
      
      executeFile.then( p  => {

        url_cloudinary = p.url;
        const dateNow = new Date();
        const { createUserAt, thematic } = body;

        const objReg: IUploadRoomFile = {
          url: url_cloudinary,
          thematic: thematic,
          createUserAt: createUserAt,
          createDateAt: dateNow
        }

        this.imagesService.create(objReg);

      })

      return executeFile;

  }

  @Get('get-by-id/:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Imagen temática obtenida correctamente", type: ImagesRoom})
  @ApiResponse({status: 400, description: "No se pudo obtener la imagen"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener una imagen"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOneById(@Res() response, 
                    @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.imagesService.findOneById(id);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Get('get-by-theme/:theme')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Imagen temática obtenida desde temática correctamente", type: ImagesRoom})
  @ApiResponse({status: 400, description: "No se pudo obtener por temática la imagen"})
  @ApiResponse({status: 401, description: "No tiene permisos para obtener por temática una imagen"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async findOneByTheme(@Res() response, 
                 @Param('theme', ParseUUIDPipe) theme: string) {

    const result = await this.imagesService.findOneByTheme(theme);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

  @Delete('delete-by-id/:id')
  @Auth( 
    EValidRoles.ADMIN, 
    EValidRoles.DEV, 
    EValidRoles.SUPER_USER
  )
  @ApiResponse({status: 200, description: "Eliminar imagen de temática correctamente", type: ImagesRoom})
  @ApiResponse({status: 400, description: "No se pudo eliminar la imagen"})
  @ApiResponse({status: 401, description: "No tiene permisos para eliminar una imagen"})
  @ApiResponse({status: 403, description: "Token invalido"})
  async remove(@Res() response, 
         @Param('id', ParseUUIDPipe) id: string) {

    const result = await this.imagesService.remove(id);

    if(result.operation.code === "OK"){

      return response.status(HttpStatus.OK).send(result);

    }else{

      return response.status(HttpStatus.NOT_FOUND).send(result);

    }

  }

}
