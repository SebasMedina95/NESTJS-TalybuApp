import { ConfigModule, 
         ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [

    AuthController

  ],
  providers: [

    AuthService,
    JwtStrategy

  ],
  imports: [

    ConfigModule,

    TypeOrmModule.forFeature([ 
      User 
    ]),

    PassportModule.register({ 
      defaultStrategy: 'jwt' 
    }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })

  ],
  exports: [

    AuthService,
    JwtModule,
    JwtStrategy,
    PassportModule,
    TypeOrmModule,

  ]

})
export class AuthModule {}
