import { DB_CONNECTION } from '@hapel/database';
import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import BotClient from './Client';

@Injectable()
export class DiscordBotService {
  private bot: BotClient = new BotClient();

  constructor(@Inject(DB_CONNECTION) protected connection: Connection) {}

  public getBot() {
    return this.bot;
  }
}
