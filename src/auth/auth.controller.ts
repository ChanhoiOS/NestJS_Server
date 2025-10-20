import {
  Body,
  Controller,
  Delete,
  Headers,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from '../common/Response/response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';

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

  @Delete('delete')
  @UseGuards(AuthGuard())
  @ApiParam({
    name: 'Authorization',
    required: false,
  })
  async deleteUser(@Headers('Authorization') auth: string) {
    try {
      const userHash = await this.authService.getUser(auth);
      await this.authService.deleteUser(userHash);
      return ResponseDto.success(
        {},
        '회원정보가 삭제되었습니다.',
        HttpStatus.OK,
      );
    } catch (e) {
      return ResponseDto.fail(
        '회원정보 삭제에 실패하였습니다. 다시 시도해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
