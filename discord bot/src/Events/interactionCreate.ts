import { CommandInteraction } from "discord.js";
import { Event } from "../Interfaces";

export const event: Event = {
    name: "interactionCreate",
    run: async ( client, i: CommandInteraction ) => {
        if ( !i.isCommand() ) return;
            
        const command = client.commands.get( i.commandName );
        if ( !command ) return;

        try {

            if( i.memberPermissions.has( command.permission ) || ( command.onlyFor && command.onlyFor.indexOf(i.user.id) !== -1 ) )
                await command.run({client, message: i});

        } catch (e) { 
            console.error(`Error while executing ${i.commandName}`, e);
        }
    }   
}