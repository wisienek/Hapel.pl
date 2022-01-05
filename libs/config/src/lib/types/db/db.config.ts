import { ConfigService } from '../../config.service';
import { Injectable } from '@nestjs/common';
import { BaseConfig } from '../base.config';

@Injectable()
export class DbConfig extends BaseConfig<'DB'> {
  constructor(configService?: ConfigService) {
    super('DB', configService ?? ConfigService.init(DbConfig));
  }

  get HOST(): string {
    return this.variables.DB_HOST;
  }

  get PORT(): number {
    return this.variables.DB_PORT;
  }

  get USERNAME(): string {
    return this.variables.DB_USERNAME;
  }

  get PASSWORD(): string {
    return this.variables.DB_PASSWORD;
  }

  get DATABASE(): string {
    return this.variables.DB_DATABASE;
  }
}
