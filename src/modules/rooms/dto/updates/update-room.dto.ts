import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from '../creates/create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
