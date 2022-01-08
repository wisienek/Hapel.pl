import { Guild, TextChannel } from 'discord.js';

import { Event } from '../interfaces';
import { registerCommands } from '../functions/registerCommands';

export const event: Event = {
  name: 'ready',
  run: async (client) => {
    client.logger.log(`${client.user.username} online!`);
    
    client.guilds.cache.forEach((guild: Guild) => {
      client.logger.log(`Hapel-Ic załadował ${guild.name}`);
    });

    for (const listener of client.reactionListeners) {
      if (client.Messages.get(listener.message)) continue;

      const channel = (await client.channels.fetch(
        listener.channel
      )) as TextChannel;
      const message = await channel.messages.fetch(listener.message);

      if (channel && message) {
        client.Channels.set(listener.channel, channel);
        client.Messages.set(listener.message, message);
      }
    }

    registerCommands(client);
  },
};
