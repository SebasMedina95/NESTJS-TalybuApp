import { Logger, 
         ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {

  //? Entrada de la aplicación
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap')

  //? Alias de la aplicación
  app.setGlobalPrefix('api-talybu/v1');

  //? Configuración global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  //? Configuración del cors
  app.enableCors();

  //? Configuración de puerto
  await app.listen( process.env.PORT );
  logger.log(`La APP está corriendo en puerto ${process.env.PORT}`);

}

main();
