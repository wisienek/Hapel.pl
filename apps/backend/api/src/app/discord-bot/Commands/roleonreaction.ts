import { Permissions, TextChannel } from 'discord.js';
import { Command, Listener, OptionType } from '../interfaces';

export const command: Command = {
  name: 'roleonreaction',
  description: 'rola za reakcję!',
  permission: Permissions.FLAGS.MANAGE_ROLES,
  options: [
    {
      type: OptionType.CHANNEL,
      name: 'kanał',
      description: 'W jakim kanale znajduje się wiadomość (oznacz go)',
      required: true,
    },
    {
      type: OptionType.STRING,
      name: 'msg_id',
      description: 'ID wiadomości na jaką podłączyć listener.',
      required: true,
    },
    {
      type: OptionType.STRING,
      name: 'emoji',
      description: 'Emoji do nadawania roli',
      required: true,
    },
    {
      type: OptionType.ROLE,
      name: 'rola',
      description: 'Jaką rolę dać po kliknięciu na emotkę',
      required: true,
    },
  ],
  run: async ({ client, message }) => {
    if (message?.options?.data?.length == 4) {
      const channel = message.options.getChannel('kanał');
      const msgLink = message.options.getString('msg_id');
      const emoji = message.options.getString('emoji');
      const role = message.options.getRole('rola');

      const fetchedChannel =
        client.Channels.get(channel.id) ||
        ((await message.guild.channels.fetch(channel.id)) as TextChannel);
      if (!fetchedChannel) return message.reply('Nie znaleziono kanału!');

      const fetchedMessage =
        client.Messages.get(msgLink) ||
        (await fetchedChannel.messages.fetch(msgLink));
      if (!fetchedMessage) return message.reply('Nie znaleziono wiadomości!');

      const reacted = await fetchedMessage.react(emoji);
      if (!reacted?.count)
        return message.reply('Nie można było zareagować na wiadomość!');

      const isadded: Listener | null = await client.db.listener.findFirst({
        where: {
          guild: message.guild.id,
          channel: channel.id,
          emoji,
          role: role.id,
        },
      });

      if (isadded)
        return message.reply(`Jest już taki listener ||id: ${isadded.id}|| !`);

      const item: Listener = await client.db.listener.create({
        data: {
          guild: message.guild.id,
          channel: channel.id,
          message: msgLink,
          emoji,
          role: role.id,
        },
      });

      client.reactionListeners.push(item);

      message.reply(
        `Zapisano listener na kanale: <#${channel.id}> emotka: ${emoji} daje rolę: ${role.name}!`
      );
    } else {
      return message.reply('Za mało argumentów ;v');
    }
  },
};
