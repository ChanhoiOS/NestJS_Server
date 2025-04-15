import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { ResponseDto } from '../common/Response/response.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
  async signIn(@Body() createUserDto: SignUpDto) {
    try {
      const response = await this.authService.signUp(createUserDto);
      return ResponseDto.success(response, '', HttpStatus.OK);
    } catch (e) {
      return ResponseDto.fail(
        '회원가입에 실패하였습니다.',
        HttpStatus.AMBIGUOUS,
      );
    }
  }
}
