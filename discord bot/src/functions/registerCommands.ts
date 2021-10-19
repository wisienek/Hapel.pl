import { Command, CommandList } from "../Interfaces";

import { REST }  from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from "@discordjs/builders";
import botClient from "../Client";

const rest = new REST({version: '9'}).setToken( process.env.TOKEN1 );


export const registerCommands: (client: botClient, guildIds?: string[]) => void = ( client: botClient, guildIds: string[] ) => {
    const guilds = client.guilds.cache;
    const builtCommands = client.commands.map( (command: Command) => {
        const cmd = new SlashCommandBuilder()
                        .setName(command.name)
                        .setDescription(command?.description)
                        .setDefaultPermission( command?.onlyFor? false : true);

        if( command?.options ) {
            for( const option of command.options ){
                const { type, name, description, required } = option;

                switch( type ) {
                    case "BOOLEAN": cmd.addBooleanOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "CHANNEL": cmd.addChannelOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "INTEGER": cmd.addIntegerOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "MENTIONABLE": cmd.addMentionableOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "NUMBER": cmd.addNumberOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "ROLE": cmd.addRoleOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "STRING": cmd.addStringOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    case "USER": cmd.addUserOption(opt=> opt.setName(name).setDescription(description).setRequired(required));break;
                    default: cmd.addStringOption(opt=> opt.setName(name).setDescription(description).setRequired(required));
                }
            }
        }
        return cmd.toJSON();
    });

    for (const gi of guilds) {
        const guild = gi[1];
        
        if( guildIds && guildIds.indexOf( guild.id ) == -1 ) continue;

        rest.put(
            Routes.applicationGuildCommands( client.user.id, gi[0] ), 
            { body: builtCommands } 
        )
        .then( async ( commandList: CommandList[] ) => {
            commandList.forEach( async ( cmd ) => {
                const tmpPermission = [];
                const tmpCommand = client.commands.get(cmd.name);
                if( tmpCommand?.onlyFor ) {
                    tmpCommand.onlyFor.forEach( async (id: string) => {
                        const member = await guild.members.fetch( id );

                        if( member ) {
                            tmpPermission.push({
                                id: id,
                                type: "USER",
                                permission: true
                            });
                        }
                    });
    
                    await guild.commands.permissions.add({
                        command: cmd.id,
                        permissions: tmpPermission
                    })

                }
            });
        })
        .catch(console.error);
    }
}