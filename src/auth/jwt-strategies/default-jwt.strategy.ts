import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Repository } from 'typeorm';
import { ExtractJwt } from 'passport-jwt';
import { printLog } from '../../common/Log/log-util';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DefaultJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'), // ✅ 안전하게 불러오기
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const userHash = payload.data;
    const user: UserEntity = await this.userRepository.findOneBy({
      userHash: userHash,
    });
    printLog('요청하는 유저 해시 : ', userHash);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
