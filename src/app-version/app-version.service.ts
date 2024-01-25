import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppVersionEntity } from './entity/app-version.entity';
import { Repository } from 'typeorm';
import { GetAppVersionDto } from './dto/get-app-version.dto';
import { ResponseBuilder } from '../common/builder/response-builder';
import { SUCCEESS_MESSAGE } from '../common/constants/response-messages';

@Injectable()
export class AppVersionService {
  constructor(
    @InjectRepository(AppVersionEntity)
    private readonly appVersionRepository: Repository<AppVersionEntity>,
  ) {}

  async getAppVersion(getAppVersionDto: GetAppVersionDto) {
    try {
      const result = await this.appVersionRepository.findOneBy({
        platformType: getAppVersionDto.platformType,
      });

      return new ResponseBuilder()
        .setMessage(SUCCEESS_MESSAGE.SUCCESS_FETCH_APP_VERSION)
        .setData(result.version)
        .build();
    } catch (e) {}
  }
}