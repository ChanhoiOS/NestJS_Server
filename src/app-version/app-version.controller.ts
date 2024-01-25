import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppVersionService } from './app-version.service';
import { GetAppVersionDto } from './dto/get-app-version.dto';

@ApiTags('앱 버전 API')
@Controller('/api/app-version')
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Get()
  async getAppVersion(
    @Query() getAppVersionDto: GetAppVersionDto,
    @Res() res: Response,
  ) {
    console.log(getAppVersionDto);
    const response =
      await this.appVersionService.getAppVersion(getAppVersionDto);
    res.status(HttpStatus.OK).json(response);
  }
}
