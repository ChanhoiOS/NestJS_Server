import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  userHash: string;

  @IsString()
  usingPlatform: string;
}
