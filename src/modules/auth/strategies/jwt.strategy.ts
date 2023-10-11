import { Injectable, 
         UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, 
         Strategy } from "passport-jwt";
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

import { ApiResponse } from '../../../utils/ApiResponse';
import { EResponseCodes } from '../../../constants/ResponseCodesEnum';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            //? Enviamos como header de autorización y como un Bearer Token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: IJwtPayload): Promise<ApiResponse<IUser>> {

        if( !payload ) throw new UnauthorizedException("El token no existe.");

        const { id } = payload;
        const user = await this.userRepository.findOneBy({ id });

        if (!user) throw new UnauthorizedException("El token no es válido.");
        if (!user.status) throw new UnauthorizedException("El usuario no está activo.");

        const objForRequest: IUser = {

            id: user.id,
            document: user.document,
            typeDocument: user.typeDocument,
            fullName: user.fullName,
            phone: user.phone,
            address: user.address,
            email: user.email,
            status: user.status,
            roles: user.roles,

        }

        return new ApiResponse(
            objForRequest,
            EResponseCodes.OK,
            "Generación estratégia, generación de validación."
        );

    }

}
