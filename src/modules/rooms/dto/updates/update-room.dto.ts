// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from '../creates/create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
