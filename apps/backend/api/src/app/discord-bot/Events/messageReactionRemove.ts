import { GuildMember, MessageReaction } from 'discord.js';
import { DiscordBotService } from '../discord-bot.service';

import { Event } from '../interfaces';

export const event: Event = {
  name: 'messageReactionRemove',
  async run(
    client: DiscordBotService,
    reaction: MessageReaction,
    user: GuildMember
  ) {
    const emoji = reaction.emoji.name;
    const messageid = reaction.message.id;

    const reactionListener = client.reactionListeners.find(
      (listener) => listener.message == messageid && listener.emoji == emoji
    );
    if (reactionListener) {
      const role = await reaction.message.guild.roles.fetch(
        reactionListener.role
      );
      const member = await reaction.message.guild.members.fetch(user.id);

      if (role) {
        member.roles.remove(role);
      }
    }
  },
};
