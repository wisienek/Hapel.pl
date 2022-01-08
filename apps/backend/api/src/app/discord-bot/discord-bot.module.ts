import { AppConfig, ConfigModule, DbConfig } from '@hapel/configs';
import { DatabaseModule } from '@hapel/database';
import { Module } from '@nestjs/common';
import { DiscordBotService } from './discord-bot.service';

@Module({
  imports: [
    ConfigModule.forConfigs([
      AppConfig,
      //DbConfig
    ]),
    //DatabaseModule
  ],
  providers: [DiscordBotService],
  exports: [DiscordBotService],
})
export class DiscordBotModule {}
