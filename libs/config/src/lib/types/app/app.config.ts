import { ConfigService } from '../../config.service';
import { Injectable } from '@nestjs/common';
import { BaseConfig } from '../base.config';
import { ENVS } from './app.env';

@Injectable()
export class AppConfig extends BaseConfig<'APP'> {
  constructor(configService?: ConfigService) {
    super('APP', configService ?? ConfigService.init(AppConfig));
  }

  get SECRET(): string {
    return this.variables.APP_SECRET;
  }

  get LOG_LEVEL(): string {
    return this.variables.APP_LOG_LEVEL;
  }

  get APP_CURRENT_ENV(): string {
    return this.variables.APP_CURRENT_ENV;
  }

  public isDev(): boolean {
    return this.variables.APP_CURRENT_ENV === ENVS.DEV;
  }
}
