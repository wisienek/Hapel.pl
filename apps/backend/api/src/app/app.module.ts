import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from '@hapel/configs';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DiscordBotModule } from './discord-bot/discord-bot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig()),
    SchedulerModule,
    DiscordBotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
