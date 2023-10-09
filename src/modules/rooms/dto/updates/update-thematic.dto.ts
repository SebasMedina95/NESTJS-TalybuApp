import { PartialType } from '@nestjs/mapped-types';
import { CreateThematicDto } from '../creates/create-thematic.dto';

export class UpdateThematicDto extends PartialType(CreateThematicDto) {}
