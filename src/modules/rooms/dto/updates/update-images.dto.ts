// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateImageDto } from '../creates/create-images.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
