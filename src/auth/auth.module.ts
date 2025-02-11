import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { authService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [GoogleStrategy,SessionSerializer,

        {
            provide: 'AUTH_SERVICE',
            useClass : authService
        }
    ],
})
export class AuthModule {}
