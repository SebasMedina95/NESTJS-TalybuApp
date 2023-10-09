import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

//Add
import { CloudinaryResponse } from './files-response';
const streamifier = require('streamifier');

@Injectable()
export class FilesService {
  
  //Metodo aquí
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {

    return new Promise<CloudinaryResponse>(
      
      (resolve, reject) => {
        
        const uploadStream = cloudinary.uploader.upload_stream(
            
          (error, result) => {

            if (error) return reject(error);
            resolve(result);

          },

        );
        
        //Este es el archivo
        streamifier.createReadStream(file.buffer).pipe(uploadStream);

      }

    );

  }

}
