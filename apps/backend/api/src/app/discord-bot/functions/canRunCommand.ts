import { CommandInteraction } from 'discord.js';
import { DiscordBotService } from '../discord-bot.service';
import { Command } from '../interfaces';

export const canRunCommand: (
  i: CommandInteraction,
  c: Command,
  b: DiscordBotService
) => Promise<boolean> = async (
  interaction: CommandInteraction,
  command: Command
) => {
  const member = await interaction.guild.members.fetch(interaction.user.id);

  const hasPermission = interaction.memberPermissions.has(command.permission);
  const onlyForUser =
    command.onlyFor && command.onlyFor.indexOf(interaction.user.id) !== -1;
  const onlyForRoles =
    command.onlyFor &&
    member.roles.cache.some((r) => command.onlyFor.indexOf(r.id) > -1);

  if (hasPermission || onlyForUser || onlyForRoles) return true;
};
