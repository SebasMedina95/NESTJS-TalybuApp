
export interface IComfort {

    id? : string;
    comfort: string;
    status: boolean;

    createUserAt?: string;
    createDateAt?: Date;
    updateUserAt?: string;
    updateDateAt?: Date;

    comfortSchema?: IComfort;

}

export interface IComfortList {

    items: IComfort[];
    page: number;
    perPage: number;
    totalData: number;
    totalPages: number;

}
