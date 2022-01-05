import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfig, ConfigModule, DbConfig } from '@hapel/configs';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DiscordBotModule } from './discord-bot/discord-bot.module';
import { DatabaseModule } from '@hapel/database';

@Module({
  imports: [
    ConfigModule.forConfigs([AppConfig, DbConfig]),
    SchedulerModule,
    DatabaseModule,
    // DiscordBotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
