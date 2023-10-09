import { ValidCategories } from "../constants/categories.interface";
import { IComfort } from "./comforts.interfaces";
import { Thematic } from '../entities/thematic.entity';
import { Comfort } from '../entities/comfort.entity';


export interface IThematic {

    id? : string;
    thematic: string;
    description: string;
    size: string;
    categories: ValidCategories | string;
    tags: string[];
    price: number;
    status: boolean;
    promotion?: boolean;
    promotionPercentaje?: number;

    createUserAt?: string;
    createDateAt?: Date;
    updateUserAt?: string;
    updateDateAt?: Date;

    comforts?: string[] | any[];

}

export interface IThematicUpdateRequest {

    resThematic: IThematic;
    comforts: string[];

}

export interface IThematicTrasactionCreate {

    thematic: IThematic;
    comfort: IComfort[];

}

export interface IThematicList {

    items: IThematic[];
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;

}

export interface IComfortsMini {

    idComfort: string;
    comfort: string;

}

export interface IThematicWithComforts {

    thematic: IThematic;
    comforts: IComfortsMini[];

}

export interface ThematicComfortRequest {

    id: number,
    thematic: Thematic,
    comfort: Comfort

}