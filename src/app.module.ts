import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { ConsumptionModule } from './modules/consumption/consumption.module';
import { PersonsModule } from './modules/persons/persons.module';
import { ProductsModule } from './modules/products/products.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomsModule } from './modules/rooms/rooms.module';

import { PaginationModule } from './global/pagination/pagination.module';
import { FilesModule } from './global/files/files.module';

import { dataSourceOptions } from '../db/data-source';



@Module({
  imports: [

    //? Configuración Global
    ConfigModule.forRoot({ isGlobal: true }),

    //? Configuración del TypeORM y Postgres
    TypeOrmModule.forRoot(dataSourceOptions),

    //? Módulos de trabajo
    AuthModule,
    ConsumptionModule,
    FilesModule,
    PaginationModule,
    PersonsModule,
    ProductsModule,
    ReservationsModule,
    RoomsModule,
  ],  
  controllers: [],
  providers: [],
})
export class AppModule {}
