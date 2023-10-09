import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from '../creates/create-images.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
