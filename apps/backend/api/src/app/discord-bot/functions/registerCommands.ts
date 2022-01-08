import { Command, CommandList } from '../interfaces';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DiscordBotService } from '../discord-bot.service';
import { AppConfig } from '@hapel/configs';

const rest = new REST({ version: '9' }).setToken(new AppConfig().SECRET);

export const registerCommands: (
  client: DiscordBotService,
  guildIds?: string[]
) => void = (client: DiscordBotService, guildIds: string[]) => {
  const guilds = client.guilds.cache;
  const builtCommands: Partial<Command>[] = client.commands.map(
    (command: Command) => {
      return {
        name: command.name,
        description: command.description,
        options: command.options,
        default_permission:
          command.permission || command.onlyFor ? false : true,
      };
    }
  );

  for (const gi of guilds) {
    const guild = gi[1];

    if (guildIds && guildIds.indexOf(guild.id) == -1) continue;

    rest
      .put(Routes.applicationGuildCommands(client.user.id, gi[0]), {
        body: builtCommands,
      })
      .then(async (commandList: CommandList[]) => {
        commandList.forEach(async (cmd) => {
          const tmpPermission = [];
          const tmpCommand = client.commands.get(cmd.name);
          if (tmpCommand?.onlyFor) {
            tmpCommand.onlyFor.forEach(async (id: string) => {
              const member = await guild.members.fetch(id);

              if (member) {
                tmpPermission.push({
                  id: id,
                  type: 'USER',
                  permission: true,
                });
              }
            });

            await guild.commands.permissions.add({
              command: cmd.id,
              permissions: tmpPermission,
            });
          }
        });
      })
      .catch(client.logger.error);
  }
};
