import { Eliksiry, Oczekujace } from ".prisma/client";
import { MessageEmbed } from "discord.js";

import { Command, OptionType } from '../Interfaces';


export const command: Command = {
    name: "elki",
    description: "Komenda do eliksirów",
    options: [
        {
            type: OptionType.BOOLEAN,
            name: "lista",
            description: "czy wylistować elki?",
            required: false
        },
        {
            type: OptionType.STRING,
            name: "sprawdź",
            description: "Sprawdź elek o danym ID",
            required: false
        },
        {
            type: OptionType.STRING,
            name: "info",
            description: "Info o eliksirze",
            required: false
        },
        {
            type: OptionType.NUMBER,
            name: "top",
            description: "Top eliksirowarów",
            required: false
        }
    ],
    run: async({ client, message }) => {
        const topNumber = message.options.getNumber("top");
        const lista = message.options.getBoolean("lista");
        const check = message.options.getString("sprawdź");
        const info = message.options.getString("info");

        if( topNumber ) {
            if( topNumber <= 0 || topNumber > 20 ) return message.reply(`Topka ograniczona: (0; 20>`);

            const top = await client.db.oczekujace.groupBy({ 
                by: ['discord', 'gracz'],
                _count: {
                    id: true
                },
                orderBy: {
                    _count: {
                        id: 'desc'
                    }
                },
                take: topNumber
            });

            let msg = `Top ${topNumber} graczy tworzących eliksiry:\n`
            for( let i=0; i < top.length; i++ ) {
                const { discord, gracz, _count } = top[i];
                msg += `\n${i+1}. ${gracz} <@${discord}> razem **${_count.id}**`;
            }

            return message.reply( msg );
        }

        if( info ) {
            const elek: Oczekujace = await client.db.oczekujace.findFirst({ where: { discord: message.user.id, id: info } });
            if( !elek ) return message.reply(`Nie znaleziono elka o id: ${info}`);

            const eliksir: Eliksiry = await client.db.eliksiry.findFirst({ where: { nazwa: elek.eliksir } });
            if( !eliksir ) return message.reply(`Nie znaleziono odpowiadającego eliksiru: ${elek.eliksir}`);

            const embed = new MessageEmbed()
                .setColor(3447003)
                .setAuthor("Eliksiry")

                .addField("ID", `${elek.id}`, true)
                .addField("Nick", elek.gracz, true)
                .addField("Cena", `${elek.cena} knutów`, true)
                //.addBlankField()

                .addField("Nazwa", elek.eliksir)

                .addField("Weryfikowane", ( elek.weryfikowane == 1 ) ? "Tak" : "Oczekuje", true)
                .addField("Odebrane", ( elek.odebrane == 1 ) ? "Tak" : "Nie", true)

                .addField("Data odebrania", elek.data_odebrania ? (new Date(elek.data_odebrania).toDateString()): "Brak danych", true)
                .addField("Kociołek", elek.kociolek ? elek.kociolek: "Cynowy kociołek rozmiar 2", true)
                //.addBlankField()

                .addField("Kolor", eliksir.kolor, true)
                .addField("Hex", `#${eliksir.hex}`, true)

                .addField("Zapach", eliksir.zapach, true)
                .addField("Smak", eliksir.smak, true)

                .addField("Data ważności", `${eliksir.data} dni`, true)
                .addField("Czas trwania", isNaN(Number(eliksir.czas)) ? eliksir.czas: `${eliksir.czas} minut`, true)

                .addField("Inokreacja", eliksir.inokreacja);
            
            message.user.send({ embeds: [embed] });
            return message.reply(`Wysłano!`);
        }

        if( check ) {
            const elek: Oczekujace = await client.db.oczekujace.findFirst({
                where: {
                    discord: message.user.id,
                    id: check
                }
            });

            const embed = new MessageEmbed()
                .setColor(1146986)
                .setAuthor("Eliksiry")

                .addField("ID", `${elek.id}`, true)
                .addField("Nick", elek.gracz, true)
                .addField("Cena", `${elek.cena} knutów`, true)
                .addField("Weryfikowane", elek.weryfikowane == 1 ? "Tak" : "Oczekuje", true)
                .addField("Odebrane", elek.odebrane==1? "Tak": "Nie", true)

                .addField("Data odebrania", elek.data_odebrania? (new Date(elek.data_odebrania).toDateString()): "Brak danych", true)
                .addField("Kociołek", elek.kociolek? elek.kociolek: "Cynowy kociołek rozmiar 2", true)

                .addField("Nazwa", elek.eliksir);

            if( embed ) {
                message.user.send({ embeds: [embed] });
                return message.reply("Wysłano!");
            }

            return message.reply("Coś nie poszło w wysyłaniu");
        }

        if( lista ) {
            const elki: Oczekujace[] = await client.db.oczekujace.findMany({
                where: {
                    discord: message.user.id
                }
            });

            const embeds: MessageEmbed[] = [];
            for( const elek of elki ) {
                let embed = new MessageEmbed()
                    .setColor(10181046)
                    .setAuthor("Eliksiry")

                    .addField("ID", `${elek.id}`, true)
                    .addField("Nick", elek.gracz, true)
                    .addField("Cena", `${elek.cena} knutów`, true)
                    //.addBlankField()
                    .addField("Weryfikowane", elek.weryfikowane == 1 ? "Tak" : "Oczekuje", true)
                    .addField("Odebrane", elek.odebrane == 1 ? "Tak": "Nie", true)

                    .addField("Nazwa", elek.eliksir)

                    .addField("Data odebrania", elek.data_odebrania ? (new Date( Number(elek.data_odebrania) ).toDateString()) : "Brak danych", true)
                    .addField("Kociołek", elek.kociolek ? elek.kociolek : "Cynowy kociołek rozmiar 2", true);

                embeds.push( embed );
            }
            if( embeds.length > 0 ) {
                message.user.send({ embeds });
                return message.reply("Wysłano!");
            }

            return message.reply(`Nie masz żadnych elków!`);
        }

        return message.reply("OK");
    }
};



// hplcon.query(`SELECT count(discord) AS "Licz", discord from Oczekujące WHERE weryfikowane = 1 group by gracz order by 1 desc limit 10;`, (er,rows)=>{
