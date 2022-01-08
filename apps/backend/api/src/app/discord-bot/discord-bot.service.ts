import { DB_CONNECTION } from '@hapel/database';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Command, Event, Listener } from './interfaces';
import { AppConfig } from '@hapel/configs';

import { ExternalCommands } from './Commands';
import { Events } from './Events';

import { Connection } from 'typeorm';
import { Client, Collection, Intents, Message, TextChannel } from 'discord.js';

@Injectable()
export class DiscordBotService extends Client {
  public logger: Logger = new Logger( DiscordBotService.name );
  private readonly appConfig = new AppConfig();

  public commands: Collection<string, Command>;
  public events: Collection<string, Event>;
  public aliases: Collection<string, Command>;
  public reactionListeners: Listener[];

  public Channels: Collection<string, TextChannel>;
  public Messages: Collection<string, Message>;

  constructor(
    // @Inject(DB_CONNECTION) protected connection: Connection
  ) {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      ],
    });

    this.commands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();

    this.reactionListeners = [];

    this.Channels = new Collection();
    this.Messages = new Collection();

    this.init();
  }

  public getBot() {
    return this;
  }

  private async init() {
    await this.login(this.appConfig.SECRET);

    this.registerCommands();
    this.registerEvents();

    // this.reactionListeners = await this.connection.listener.findMany() || [];
  }

  private registerCommands() {
    ExternalCommands.forEach(cmd => {
      this.commands.set(cmd.name, cmd);

      if (cmd?.aliases?.length > 0)
        cmd.aliases.forEach((alias: string) =>
          this.aliases.set(alias, cmd)
        );
    });
    this.logger.log(`Zarejestrowano: ${this.commands.size} komend`);
  }

  private registerEvents() {
    Events.forEach(event => {
      this.events.set(event.name, event);

      this.on(event.name, event.run.bind(null, this));
    });

    this.logger.log(`Zarejestrowano: ${this.events.size} eventów`);
  }
}
