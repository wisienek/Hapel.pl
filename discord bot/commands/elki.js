const { hplcon } = require('../databases');
const Discord = require('discord.js');

module.exports = function (message, args){
    const prefix = message.content[0];
    switch ( args[0] ) {
        case "lista":{
            hplcon.query(`SELECT * FROM Oczekujące WHERE discord = '${message.author.id}' `, (er,rows)=>{
                if(er) throw er;
                if(rows && rows.length>0){
                    rows.forEach(r=>{
                        let embed = new Discord.MessageEmbed()
                        .setColor(10181046)
                        .setAuthor("Eliksiry")

                        .addField("ID", `${r.id}`, true)
                        .addField("Nick", r.gracz, true)
                        .addField("Cena", `${r.cena} knutów`, true)
                        //.addBlankField()
                        .addField("Weryfikowane", r.weryfikowane==1? "Tak" : "Oczekuje", true)
                        .addField("Odebrane", r.odebrane==1? "Tak": "Nie", true)

                        .addField("Nazwa", r.eliksir)

                        .addField("Data odebrania", r.data_odebrania? (new Date(r.data_odebrania).toDateString()): "Brak danych", true)
                        .addField("Kociołek", r.kociołek? r.kociołek: "Cynowy kociołek rozmiar 2", true);
                        message.author.send(embed);
                    });

                }else{
                    message.author.send("Brak wyników!");
                }
            });

            break;
        }
        case "sprawdź":{
            if(!args[1]) return message.author.send("Nie podano 2 argumentu: id eliksiru");
            hplcon.query(`SELECT * FROM Oczekujące WHERE discord = '${message.author.id}' AND id='${args[1]}'; `, (er,rows)=>{
                if(er) throw er;
                if(rows && rows.length > 0){
                    rows.forEach(r=>{
                        let embed = new Discord.MessageEmbed()
                        .setColor(1146986)
                        .setAuthor("Eliksiry")

                        .addField("ID", `${r.id}`, true)
                        .addField("Nick", r.gracz, true)
                        .addField("Cena", `${r.cena} knutów`, true)
                        .addField("Weryfikowane", r.weryfikowane==1? "Tak" : "Oczekuje", true)
                        .addField("Odebrane", r.odebrane==1? "Tak": "Nie", true)

                        .addField("Data odebrania", r.data_odebrania? (new Date(r.data_odebrania).toDateString()): "Brak danych", true)
                        .addField("Kociołek", r.kociołek? r.kociołek: "Cynowy kociołek rozmiar 2", true)
                        //.addBlankField()

                        .addField("Nazwa", r.eliksir);

                        message.author.send(embed);
                    });
                }else{
                    message.author.send(`Brak wyników dla eliksiru o id \`${args[1]}\` i dcID \`${message.author.id}\``);
                }
            });
            break;
        }
        case "info":{
            if(!args[1]) return message.author.send("Nie podano 2 argumentu: **id** eliksiru");
            hplcon.query(`SELECT * FROM Oczekujące LEFT JOIN Eliksiry ON Oczekujące.eliksir = Eliksiry.nazwa WHERE discord='${message.author.id}' AND id='${args[1]}'; `, (er,rows)=>{
                if(er) throw er;
                if(rows && rows.length > 0){
                    let skipped = [];
                    rows.forEach(r=>{
                        if(r.weryfikowane != 1) { skipped.push(r.id) }else{
                            let embed = new Discord.MessageEmbed()
                            .setColor(3447003)
                            .setAuthor("Eliksiry")

                            .addField("ID", `${r.id}`, true)
                            .addField("Nick", r.gracz, true)
                            .addField("Cena", `${r.cena} knutów`, true)
                            //.addBlankField()

                            .addField("Nazwa", r.eliksir)

                            .addField("Weryfikowane", r.weryfikowane==1? "Tak" : "Oczekuje", true)
                            .addField("Odebrane", r.odebrane==1? "Tak": "Nie", true)

                            .addField("Data odebrania", r.data_odebrania? (new Date(r.data_odebrania).toDateString()): "Brak danych", true)
                            .addField("Kociołek", r.kociołek? r.kociołek: "Cynowy kociołek rozmiar 2", true)
                            //.addBlankField()

                            .addField("Kolor", r.kolor, true)
                            .addField("Hex", `#${r.hex}`, true)

                            .addField("Zapach", r.zapach, true)
                            .addField("Smak", r.smak, true)

                            .addField("Data ważności", `${r.data} dni`, true)
                            .addField("Czas trwania", isNaN(r.czas)? r.czas: `${r.czas} minut`, true)
                            
                            .addField("Inokreacja", r.inokreacja);
                            message.author.send(embed);
                        }
                    }); 
                }else{
                    message.author.send(`Brak wyników dla eliksiru o id \`${args[1]}\` i dcID \`${message.author.id}\``);
                }
            });

            break;
        }
        case "top":{
            hplcon.query(`SELECT count(discord) AS "Licz", discord from Oczekujące WHERE weryfikowane = 1 group by gracz order by 1 desc limit 10;`, (er,rows)=>{
                if(er) throw er;
                let msg = "Top 10 graczy tworzących eliksiry:";
                rows.forEach((r,i)=> msg += `\n${i+1}.<@${r.discord}> razem **${r.Licz}**` )
                message.channel.send(msg);
            });
            break;
        }

        default:{
            return message.author.send(`Użycie komendy: \`${prefix}elki <top/lista/sprawdź/info> <id>\``);
        }
    }
}