import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComfortsService } from './services/comforts.service';
import { FilesService } from '../../global/files/files.service';
import { ImagesService } from './services/images.service';
import { RoomsService } from './services/rooms.service';
import { ThematicsService } from './services/thematics.service';

import { ComfortsController } from './controllers/comforts.controller';
import { ImagesController } from './controllers/images.controller';
import { RoomsController } from './controllers/rooms.controller';
import { ThematicsController } from './controllers/thematics.controller';

import { Comfort } from './entities/comfort.entity';
import { ImagesRoom } from './entities/image.entity';
import { Room } from './entities/room.entity';
import { Thematic } from './entities/thematic.entity';
import { ThematicsComfortsMaster } from './entities/thematics-comforts.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [
    RoomsController,
    ThematicsController,
    ComfortsController,
    ImagesController
  ],
  providers: [
    RoomsService,
    ThematicsService,
    ComfortsService,
    ImagesService,
    FilesService
  ],
  imports: [
    AuthModule,
    
    TypeOrmModule.forFeature([
      Room,
      Thematic,
      Comfort,
      ImagesRoom,
      ThematicsComfortsMaster
    ]),
  ],
  exports: [
    RoomsService,
    ThematicsService,
    ComfortsService,
    ImagesService
  ]
})
export class RoomsModule {}
