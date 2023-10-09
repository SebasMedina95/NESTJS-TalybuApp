import { createParamDecorator,
         ExecutionContext,
         InternalServerErrorException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { ApiResponse } from '../../../utils/ApiResponse';

//? Decorador para obtener toda la información del usuario
export const UserGetMyDecorator = createParamDecorator(
    ( data: User , ctx: ExecutionContext ): Promise<ApiResponse<User>> => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if( !user ) throw new InternalServerErrorException('El usuario no fue encontrado (request)');

        return user;

    }
);

export const UserGetSpecifyFieldDecorator = createParamDecorator(
    ( data: string , ctx: ExecutionContext ) => {

        console.log(data);
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if( !user ) throw new InternalServerErrorException('El usuario no fue encontrado (request)');

        return ( !data ) ? user : user[data];
    }
);