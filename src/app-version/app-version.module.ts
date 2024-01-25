import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppVersionService } from './app-version.service';
import { AppVersionController } from './app-version.controller';
import { AppVersionEntity } from './entity/app-version.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    TypeOrmModule.forFeature([AppVersionEntity]),
  ],

  controllers: [AppVersionController],
  providers: [AppVersionService],
})
export class AppVersionModule {}
