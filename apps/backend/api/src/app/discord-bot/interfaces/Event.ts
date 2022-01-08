import { ClientEvents } from 'discord.js';
import { DiscordBotService } from '../discord-bot.service';

interface Run {
  (client: DiscordBotService, ...args: any[]);
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
