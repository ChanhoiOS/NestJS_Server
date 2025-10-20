import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@ApiTags('유저 API')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
}
