import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseDto } from '../common/Response/response.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { printLog } from '../common/Log/log-util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      await this.userRepository.save({
        usingPlatform: signUpDto.usingPlatform,
        userHash: signUpDto.userHash,
      });
      printLog('test');
      return await this.login({
        usingPlatform: signUpDto.usingPlatform,
        userHash: signUpDto.userHash,
      });
    } catch (e) {
      printLog('e', e);
      throw e;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const userInfo = await this.userRepository.findOneBy({
      usingPlatform: loginUserDto.usingPlatform,
      userHash: loginUserDto.userHash,
    });

    const payload = loginUserDto.userHash;
    const accessToken = this.jwtService.sign(
      {
        data: payload,
      },
      { expiresIn: 60 * 60 * 24 }, //24시간
    );

    if (userInfo == null) {
      return ResponseDto.fail(
        '유저를 찾을 수 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return ResponseDto.success(
      {
        userHash: userInfo.userHash,
        accessToken: accessToken,
      },
      '로그인에 성공하였습니다.',
      HttpStatus.OK,
    );
  }
}
