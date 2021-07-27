const { hplcon } = require('../databases');
const Discord = require('discord.js');

module.exports = function(message, args, bot){
    if(message.channel.type === "dm") return;
    const prefix = message.content[0];
    if(message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_ROLES")){
        if(!args[0]) return message.author.send(`Użycie komendy:\n\`${prefix}welki check <id>\` - podaje info o eliksirze do weryfikacji\n\`${prefix}welki oceń tak <id> [I:4 D:14 Z:0 E:Nazwa eliksiru]\` - I; ile fiolek, D; x dni ważności, Z; nowa cena eliksiru, E; pełna nazwa eliksiru\n\`${prefix}welki oceń nie <id> [powód]\` - odrzuca eliksir z powodem.\n\n\`<argument>\` - obowiązkowy\n\`[arg1, arg2, arg3]\` - nieobowiązkowy `);
        switch( args[0].toLocaleLowerCase() ){
            case "check":{
                let id = args[1];
                let querry = `SELECT id, eliksir, gracz, przepis, discord, cena, weryfikowane, kociołek FROM Oczekujące WHERE weryfikowane=3 `;
                if(id) { querry += ` AND id = '${id}' ` }
                hplcon.query(querry, (er, rows)=>{
                    if(er) throw er;
                    if(rows && rows.length > 0){
                        rows.forEach(r=>{
                            let file;
                            let embed = new Discord.MessageEmbed()
                            .setColor(10181046)
                            .setAuthor("Oczekujące elki")

                            .addField("ID", `${r.id}`, true)
                            .addField("Nick", r.gracz, true)
                            .addField("Cena", `${r.cena} knutów`, true)

                            .addField("Eliksir", r.eliksir)

                            .addField("Weryfikowane", r.weryfikowane==1? "Tak": "Nie", true)
                            .addField("Kociołek", r.kociołek || "Cynowy kociołek rozmiar 2", true);
                            let przepis = JSON.parse(r.przepis).join("\n");
                            if(r.przepis.length < 2000) { embed.addField("Przepis", przepis.replace(/§./g, ""))}else{
                                fs.writeFileSync(`${r.id}.txt`, przepis);
                                let buffer = fs.readFileSync(`${r.id}.txt`);
                                file = new Discord.MessageAttachment(buffer, `${r.id}.txt`);
                            }
                            
                            file? message.author.send(embed, file) :message.author.send(embed);
                        });
                    }else{
                        return message.author.send(`Brak wyników dla id: \`${id}\``);
                    }
                });

                break;
            }
            case "ocen": case "oceń":{
                let wynik = args[1];
                let id = args[2];
                if(!id){ return message.author.send("Nie podano ID!") }
                if(wynik.toLocaleLowerCase() == "tak" || wynik.toLocaleLowerCase() == "nie"){
                    if(wynik == "nie"){
                        let powod = args.slice(3).join(" ");
                        hplcon.query(`SELECT * FROM Oczekujące WHERE id='${id}';`, (er,rows)=>{
                            if(er) throw er;
                            if(rows && rows.length>0){
                                let r = rows[0];
                                if(r.weryfikowane == 1){ return message.author.send(`Ticket o id \`${id}\` był już weryfikowany!`) }

                                hplcon.query(`DELETE FROM Oczekujące WHERE id='${id}';`, (err) => {if(err) throw err});
                                
                                let user = bot.users.cache.get(r.discord);
                                if(user) user.send(`Twój eliksir o id \`${id}\` ${r.eliksir} został odrzucony.`+( powod.length>0? `\nPowód: ${powod}`: "" ));

                                message.author.send(`Usunięto oczekujący eliksir o id \`${id}\` !`);
                                return console.info(`${message.author.username} Usunął oczekujący eliksir gracza ${r.gracz}, ${r.eliksir}, ${r.id}`);
                            }else{
                                return message.author.send(`Nie ma oczekującego eliksiru o id \`${id}\``);
                            }
                        });
                    }else{
                        let options = message.content.match(/[DIZ]:\d+/gi);
                        let eliksir = message.content.match(/E:.*/gi);
                        if(options && options.length>0){
                            options = options.map(o=>{
                                let i = o.split(":")[0];
                                let j = o.split(":")[1];
                                if(isNaN(parseInt(j))){ return }
                                if(i=="D"){ i = "pdata" }else
                                if(i=="I"){ i = "pile"  }else
                                if(i=="Z"){ i = "cena"  }
                                return `${i} = ${j}`;
                            }).filter(i => i);
                        }
                        if(eliksir && eliksir.length>0) {
                            eliksir = eliksir[0];
                            hplcon.query(`SELECT serial FROM Eliksiry WHERE nazwa='${eliksir.split(":")[1]}';`, (er,rows)=>{
                                if(er) console.error(er);
                                if(rows && rows.length > 0){
                                    options.push(`eliksir = '${eliksir.split(":")[1]}'`);
                                }else{
                                    message.author.send("Nie znaleizono eliksiru: "+eliksir.split(":")[1]);
                                }
                            });
                        }
                        hplcon.query(`SELECT * FROM Oczekujące WHERE id='${id}';`, (er,rows)=>{
                            if(er) console.error(er);
                            if(rows && rows.length > 0){
                                let r = rows[0];
                                if(r.weryfikowane == 1){ return message.author.send(`Ticket o id \`${id}\` był już weryfikowany!`) }

                                hplcon.query(`UPDATE Oczekujące SET ${options && options.length>0?options.join(", ")+" ,":""} weryfikowane=1 WHERE id='${id}';`, (err) => {if(err) console.error(err)});
                                
                                let user = bot.users.cache.get(r.discord);
                                if(user) user.send(`Twój eliksir o id \`${id}\` ${r.eliksir} został Zaakceptowany!`+( options && options.length>0? "\n"+options.join("\n"): "" ));

                                message.author.send(`Zaakcetpowano oczekujący eliksir o id \`${id}\` !`);
                                return console.info(`${message.author.username} Zaakceptował oczekujący eliksir gracza ${r.gracz}, ${r.eliksir}, ${r.id}`);
                            }else{
                                return message.author.send(`Nie znaleziono eliksirów o id \`${id}\``);
                            }
                        })
                    }
                }else{
                    return message.author.send(`Niepoprawny wynik: \`${wynik}\``);
                }

                break;
            }


            default:{
                return message.author.send(`Użycie komendy:\n\`${prefix}welki check <id>\` - podaje info o eliksirze do weryfikacji\n\`${prefix}welki oceń tak <id> [I:4 D:14 Z:0 E:Nazwa eliksiru]\` - I; ile fiolek, D; x dni ważności, Z; nowa cena eliksiru, E; pełna nazwa eliksiru\n\`${prefix}welki oceń nie <id> [powód]\` - odrzuca eliksir z powodem.\n\n\`<argument>\` - obowiązkowy\n\`[arg1, arg2, arg3]\` - nieobowiązkowy `)
            }
        }
    }else{
        return message.author.send("Nie masz permissi!");
    }
}