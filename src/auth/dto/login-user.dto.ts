import { IsString } from "class-validator";


export class LoginUserDto {
  @IsString()
  userHash: string;
  usingPlatform: number;
}
