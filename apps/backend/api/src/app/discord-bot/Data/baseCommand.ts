import { Permissions } from "discord.js";
import { Command } from '../interfaces';

export const command: Command = {
    name: "test",
    description: "base command",
    permission: Permissions.FLAGS.ADMINISTRATOR,
    onlyFor: [],
    run: async({ message }) => {
        return message.reply("OK");
    }
};