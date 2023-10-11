
export interface IJwtPayload {

    id: string;
    fullName: string;
    email: string;
    createUserAt?: string;
    createDateAt?: Date
    tokenCreate: Date;

}
