const { con } = require("../databases");


module.exports = function(message, args){
    if(message.channel.type === "dm") return;
    if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r=>["tester","Admin Tester"].includes(r.name))){
        if(!args[0]||!args[1]||!args[2]||((args[0]!="dodaj"||args[0]!="usuń"||args[0]!="usun"||args[0]!="mod"||args[0]!="modyfikuj")&& !args[3])){return message.author.send(`\`${prefix}r-m dodaj/usuń/modyfikuj <id roli> <skrót> [id nadającego, id2, id3...]\` `)}

        let rola = message.guild.roles.cache.get(args[1]);
        if(!rola){return message.author.send(`Niepoprawne id roli`)}
        let nadaje = JSON.parse(args[3]);
        nadaje.forEach(n=>{message.guild.roles.cache.get(n);if(!n){return message.author.send(`Niepoprawne role nadające, upewnij się , że są dobre`)}});
        if(args[0]=="dodaj"){
            return con.query(`SELECT * FROM n_role WHERE id='${args[1]}'; `,(err,rows)=>{
                if(err)console.error;
                if(rows&&rows.length>0){return message.author.send(`Już istnieje taka pozycja`)}
                message.react(bot.emojis.get(`634479516215017472`));
                console.info(`${message.member.displayName} Dodał ${rola.name} jako ${args[2]} (${args[1]}), nadaje ${args[3]}`);
                con.query(`INSERT INTO n_role(id, nazwa, nadaje, pelna_nazwa) VALUES ('${args[1]}','${args[2]}','${args[3]}','${rola.name}');`,(err1)=>{if(err1)console.error});
            });
        }else if(args[0]=="usuń"||args[0]=='usun'){
            return con.query(`SELECT * FROM n_role WHERE id='${args[1]}'; `,(err,rows)=>{
                if(err)console.error;
                if(!rows){return message.author.send(`Nie ma takiej pozycji`)}
                message.react(bot.emojis.get(`634479516215017472`));
                console.info(`${message.member.displayName} Usunął ${rola.name} (${rows[0]['nazwa']})`);
                return con.query(`DELETE FROM n_role WHERE id='${args[1]}';`,(err1)=>{if(err1)console.error});
            });
        }else if(args[0]=="mod"||args[0]=="modyfikuj"){
            return con.query(`SELECT * FROM n_role WHERE id='${args[1]}';`,(err,rows)=>{
                if(err)console.error;
                if(rows&&rows.length>0){
                    let rola = message.guild.roles.get(args[1]);
                    if(!rola){return message.author.send(`Nie znaleziono roli, podałeś złe id, bądź rola nie istnieje`)}
                    let nadaje = args[3];
                    let nazwa = args[2];
                    if(!nazwa){nazwa = rows[0]['nazwa']}
                    message.react(bot.emojis.get(`634479516215017472`));
                    console.info(`${message.member.displayName} Modyfikował ${rola.name} (${rows[0]['nazwa']} / ${nazwa}) (${rows[0]['nadaje']} / ${nadaje})`);
                    return con.query(`UPDATE n_role SET nazwa='${nazwa}', nadaje='${nadaje}' WHERE id='${args[1]}';`,(err1)=>{if(err1)console.error})
                }else{return message.author.send(`Nie znaleziono wyników w bazie do edycji`)}
            });
        }else{return message.author.send(`Niepoprawny argument`)}
    }

}