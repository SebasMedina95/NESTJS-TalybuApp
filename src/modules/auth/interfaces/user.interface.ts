import { IJwtPayload } from './jwt-payload.interface';

export interface IUser {

    id?: string;
    document: string;
    typeDocument: string;
    fullName: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    status: boolean;
    roles?: string[];
    createUserAt?: string;
    createDateAt?: Date;
    updateUserAt?: string;
    updateDateAt?: Date;

}

export interface IUserRoles {

    id?: string;
    roles?: string[];
    updateUserAt?: string;
    updateDateAt?: Date;

}

export interface IUserAuth {

    user: IUser;
    token: IJwtPayload | string;

}
