import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ConfigService } from './config.service';

import { BaseConfig } from './types/base.config';
import { ConfigType } from './types/config.type';

@Module({
  providers: [],
})
export class ConfigModule {
  static forConfigs(
    configs: ClassConstructor<BaseConfig<ConfigType>>[]
  ): DynamicModule {
    const configService = ConfigService.init(...configs);

    const providers: Provider[] = [
      {
        provide: ConfigService,
        useValue: configService,
      },
    ];

    for (const config of configs) {
      providers.push({
        provide: config,
        useValue: configService.getConfigFor(config),
      });
    }

    return {
      module: ConfigModule,
      providers,
      exports: providers,
    };
  }
}
