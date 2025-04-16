import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from '../common/Response/response.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
  async signIn(@Body() createUserDto: SignUpDto) {
    try {
      const response = await this.authService.signUp(createUserDto);
      response.message = '회원가입에 성공하였습니다.';
      return response;
    } catch (e) {
      return ResponseDto.fail(
        '회원가입에 실패하였습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const userInfo = await this.authService.login(loginUserDto);
      return userInfo;
    } catch (e) {
      return ResponseDto.fail(
        '로그인에 실패하였습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
