import { Injectable } from '@nestjs/common';
import BotClient from './Client';

@Injectable()
export class DiscordBotService {
    private bot: BotClient = new BotClient();

    public getBot() {
        return this.bot;
    }
}
