import { Thematic } from '../entities/thematic.entity';

export interface IRoom {

    id?: string;    
    number: number
    description: string
    type: string
    status: boolean
    createUserAt: string
    createDateAt: Date
    thematic?: Thematic | string

}

export interface IRoomList {

    items: IRoom[];
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;

}
