import { IsNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  userHash: string;

  @IsNumber()
  usingPlatform: number;
}
