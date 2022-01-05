import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ConfigEnvClass, ConfigType, EnvVars } from './types/config.type';
import { ClassConstructor } from 'class-transformer';
import { BaseConfig } from './types/base.config';
import { ConfigEnvs, ConfigSettingsClass } from './types/config.settings';

@Injectable()
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cachedConfigs: Map<string, any> = new Map();
  private static configSettingsMap: ConfigSettingsClass;

  private validatedEnv: Map<
    ConfigType,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }
  > = new Map<
    ConfigType,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }
  >();

  public static init(
    ...configs: ClassConstructor<BaseConfig<ConfigType>>[]
  ): ConfigService {
    const configService = new ConfigService();
    this.configSettingsMap = new ConfigSettingsClass();
    const config: Record<string, unknown> = {
      ...process.env,
      ...ConfigService.loadEnvFile(),
    };
    for (const configType of configs) {
      const configSettings = this.getSettings(configType);
      if (!configSettings) {
        throw new Error('Undefined validation function');
      }
      const validated = configSettings.fn(config);
      configService.validatedEnv.set(configSettings.configType, validated);
    }
    return configService;
  }

  public get<T extends ConfigType, C extends ConfigEnvClass<T>>(type: T): C {
    return this.validatedEnv.get(type) as C;
  }

  public getConfigFor(
    configClass: ClassConstructor<BaseConfig<ConfigType>>
  ): BaseConfig<ConfigType> {
    return this.getOrCreate(configClass);
  }

  private static getSettings(
    configClass: ClassConstructor<BaseConfig<ConfigType>>
  ): {
    fn: (config: EnvVars) => ConfigEnvs[ConfigType];
    configType: ConfigType;
  } {
    return this.configSettingsMap.getSettings(configClass);
  }

  private getOrCreate<T>(configClass: ClassConstructor<T>): T {
    if (!this.cachedConfigs.has(configClass.name)) {
      this.cachedConfigs.set(configClass.name, new configClass(this));
    }
    return this.cachedConfigs.get(configClass.name) as T;
  }

  public wasValidated(configType: ConfigType): boolean {
    return this.validatedEnv.has(configType);
  }

  private static loadEnvFile(): Record<string, unknown> {
    const envFilePath = resolve(process.cwd(), '.env');

    let config: ReturnType<typeof dotenv.parse> = {};
    if (fs.existsSync(envFilePath)) {
      config = Object.assign(
        dotenv.parse(fs.readFileSync(envFilePath)),
        config
      );
    }
    return config;
  }
}
