import { TextChannel } from "discord.js";

import { Command, OptionType } from '../interfaces';


export const command: Command = {
    name: "write",
    description: "Pisze na kanał",
    onlyFor: ["272037067897307146", "381489843466928129"],
    options: [
        {
            type: OptionType.CHANNEL,
            name: "kanał",
            description: "Na jaki kanał napisać",
            required: true
        },
        {
            type: OptionType.STRING,
            name: "msg",
            description: "Wiadomość",
            required: true
        }
    ],
    run: async({ message }) => {
        const sendTo = message.options.getChannel("kanał");
        const msg = message.options.getString("msg");

        if( !sendTo || !msg ) return message.reply("Nie znaleziono opcji!");
        if( sendTo.type != "GUILD_TEXT" ) return message.reply("Kanał nie jest tekstowy!");

        const sendToText: TextChannel = await sendTo.fetch() as TextChannel;
        const check = await sendToText.send(msg);

        if( !check.id ) return message.reply("Nie udało się wysłać wiadomości!");
        return message.reply("Wysłano!");
    }
};