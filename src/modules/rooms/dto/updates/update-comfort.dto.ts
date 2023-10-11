// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateComfortDto } from '../creates/create-comfort.dto';

export class UpdateComfortDto extends PartialType(CreateComfortDto) {}
