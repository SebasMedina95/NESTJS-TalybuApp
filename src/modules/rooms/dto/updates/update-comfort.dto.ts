import { PartialType } from '@nestjs/mapped-types';
import { CreateComfortDto } from '../creates/create-comfort.dto';

export class UpdateComfortDto extends PartialType(CreateComfortDto) {}
