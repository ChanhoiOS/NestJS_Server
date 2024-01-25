import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAppVersionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Android or iOS',
    required: true,
  })
  platformType: string;
}
