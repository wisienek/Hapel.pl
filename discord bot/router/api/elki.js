require('dotenv').config();
const express = require('express');
const elkiRouter = express.Router();
const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.NON_PRIVILEGED).add('GUILD_MEMBERS') } });
bot.login(process.env.TOKEN1);

const axios = require("axios");

const { p_hplcon } = require('../../databases');


elkiRouter.route('/')
.get(async (req, res) => {
    const id = req.query.id;
    const { oczekujace, moje, user, permission, username } = req.query;

    if(!username || !permission)
        return res.status(403).send({ type: "danger", error: "Nie zalogowany!" });

    if(!id){ 
        if(oczekujace){
            if( (permission & 0x2 ) != 0x2 )
                return res.status(403).send({ type: "danger", error: "Brak permissi!" });

                
            console.info(`Fetch oczekujące ${username} -> ${permission}`);
            const [ rows,, er ] = await p_hplcon.query(`SELECT * FROM Oczekujące WHERE weryfikowane=3;`);
            if(er){
                console.error(er);
                return res.status(502).send({ type: "danger", error: "Error z bazą danych przy fetchowaniu oczekujących"});
            }

            if ( rows && rows.length > 0 )
                return res.status(200).send({ rows });

            return res.status(404).send({ type: "info", error: "Nie ma żadnych oczekujących eliksirów do sprawdzenia."});
        }else if(moje){
            const [ rows,, er ] = await p_hplcon.query(`SELECT * FROM Oczekujące WHERE discord='${user}';`);

            if(er){
                console.error(er);
                return res.status(502).send({ type: "danger", error: "Error z bazą danych przy fetchowaniu oczekujących"});
            }

            if ( rows && rows.length > 0 ) 
                return res.status(200).send({ rows });
            
            return res.status(404).send({ type: "info", error: "Nie ma żadnych oczekujących eliksirów do sprawdzenia."});
        }else{
            return res.status(418).send({ type: "info", error: "Nie podano id!" });
        }
    }
    else{
        console.info(`${username} Fetched elki/${id}`); 
        let [ rows,, er ] = await p_hplcon.query(`SELECT * FROM Oczekujące WHERE id='${id}';`);
        if( er ) {
            console.error(er);
            return res.status(502).send({ type: "danger", error: "Error z bazą danych" });
        }
        if( rows && rows.length > 0 ){
            rows = rows[0];
            if( rows.discord == user || ( permission & 0x2 ) == 0x2 )
                return res.status(200).send({ rows });
            
            return res.status(418).send({ type: "warning", error: "Discord inny niż zalogowany! Poprawny dc: " + rows.discord });
        }

        return res.status(404).send({ type: "info", error: `Nie znaleziono żadnych wyników dla id: ${id}` })
    }
});

elkiRouter.route('/top')
.get(async (req, res) => {
    const { opt } = req.query;

    let querry; 

    if(opt == "licz"){ querry = 'SELECT count(discord) AS "Licz", discord, gracz as gosc, (SELECT eliksir from `gracz-elki` where `gracz-elki`.gracz = gosc order by LiczGracz desc, eliksir asc limit 1) as elek, (SELECT LiczGracz from `gracz-elki` where `gracz-elki`.eliksir = elek and `gracz-elki`.gracz = gosc limit 1 ) as liczElek from Oczekujące WHERE weryfikowane = 1 group by gracz order by 1 desc;'; } else
    if(opt == "elki"){ querry = `SELECT count(eliksir) AS "Licz", eliksir from Oczekujące WHERE weryfikowane = 1 group by eliksir order by 1 desc`; }


    if(!opt){ return res.status(500).send({ type: "danger", error: "Nie podano opcji!" }); }
    const [ rows,, er] = await p_hplcon.query(querry);
    if(er){
        console.error(er);
        return res.status(502).send({ type: "danger", error: "Error z bazą danych" });
    }
    if(!rows || rows.length == 0)
        return res.status(404).send({ type:"info", error: `Nie ma nikogo w topce!` });

    return res.status(200).send({ rows });
});

elkiRouter.route(`/moje`)
.get(async (req, res)=>{
    const user = req.user;
    const id = req.query.id;

    if( !id && ( !user || !user.username || !user.discord ) ) 
        return res.status(403).send({ type: "danger", error: "Nie podano użytkownika!"})

    const [ rows,, err ] = await p_hplcon.query(`SELECT id, eliksir, gracz, cena, odebrane, weryfikowane, data_odebrania, kociołek, pdata, pile FROM Oczekujące WHERE ${id? `id='${id}'`: `discord='${user.discord}'`}; `);
    if( err ){
        console.error( err );
        return res.status(502).send({ type: "danger", error: "Error przy fetchowaniu twoich elków!" });
    }
    if( !rows || rows.length == 0 )
        return res.status(404).send({ type:"info", error: `Brak wyników w twoich elkach!` });

    return res.status(200).send( { rows } );
});

elkiRouter.route(`/info`)
.get(async (req, res) => {
    const [ rows,, err ] = await p_hplcon.query(`SELECT nazwa, kolor, hex, zapach, smak, data, czas, inokreacja, pcena, ile FROM Eliksiry ORDER BY nazwa asc;`);
    
    if( err ){
        console.error( err );
        return res.status(502).send({ type: "danger", error: "Error z bazą danych" });
    }
    if(!rows || rows.length == 0)
        return res.status(404).send( { type: "info", error: `Brak informacji o elkach!` } );

    return res.status(200).send( { rows } );
});

elkiRouter.route('/skladniki')
.get(async (req, res) => {
    
    const [ rows,, err ] = await p_hplcon.query(`SELECT * FROM Składniki;`);
    if( err ){
        console.error( err );
        return res.status(502).send({ type: "danger", error: "Wystąpił błąd z zapytaniem do bazy danych!"});
    }

    return res.status(200).send({rows});
});

elkiRouter.route('/verify')
.post(async (req, res) => {
    const {id, ocena, pile, pdata, cena, powod, gosc, user, permissions } = req.body || null;
    //console.log(req.body);
    if(!user || !permissions || (permissions & 0x2 ) != 0x2 )
        return res.status(403).send({ type: "danger", error: "Brak permissi!" });
    if(ocena == "zaakceptowany"){
        const [ data,, err ] = await p_hplcon.query(`UPDATE Oczekujące SET weryfikowane=1 ${pile? ", pile="+pile: ""} ${pdata? ", pdata="+pdata: ""} ${cena? ", cena="+cena: "" } WHERE id='${id}'; `);
        if( err ) {
            console.error( err );
            return res.status(502).send({ type: "danger", error: "Error przy wpisywaniu do BD!" });
        }
        bot.users.fetch(gosc, true, true).then(u=> {
            if(u)
                u.send(`Twój eliksir o id: \`${id}\` został Zaakceptowany!\nWejdź do gry, kliknij ALT+g i nawiguj do eliksirów ocenionych aby odebrać fiolki z wywarem!`);
        });
        console.info(`${user} weryfikował eliksir ${id}, pile:${pile}, pdata:${pdata}, cena: ${cena}`);
        
        axios.post("https://discordapp.com/api/webhooks/730401458813665312/hMvfOnZ4jye7K9G8jNegC-r34zydsUa7GKRo-k_odPrE1E136TVEcsfup1rI0MculmUa", {
            "content": `[WEB] **${user}** weryfikowal eliksir gracza <@${gosc}> \`${id}\`\n\`\`\`-- Ile: ${pile || 4}\n-- Data: ${pdata || 14}\n-- Cena: ${cena}\`\`\` `,
            "tts": false,
        });
        
        return res.status(200).send({ ok: true });
    }else if(ocena == "odrzucony"){
        const [ data,, err ] = await p_hplcon.query(`DELETE FROM Oczekujące WHERE id='${id}'; `);
        if( err ) {
            console.error(`Error usuwanie elku z bd: ${err}`);
            return res.status(503).send({ type: "danger", error: "Błąd przy usuwaniu z bazy danych!" });
        }
        console.info(`${user} odrzucił eliskir ${id}, powód: ${powod}`);
        bot.users.fetch(gosc, true, true).then(dcUser=>{
            if( dcUser )
                dcUser.send(`Twój eliksir o id: \`${id}\` został odrzucony!${powod? `\nPowód odrzucenia:\n\`\`\`${powod}\`\`\`` : ""} `)
        })
        .catch(er=> {
            console.error(`Error w fetchowaniu usera na discordzie ${er}`);
        });
        axios.post("https://discordapp.com/api/webhooks/730401458813665312/hMvfOnZ4jye7K9G8jNegC-r34zydsUa7GKRo-k_odPrE1E136TVEcsfup1rI0MculmUa", {
            "content": `[WEB] **${user}** weryfikowal *negatywnie* eliksir gracza <@${gosc}> \`${id}\` !`,
            "tts": false,
        });
        return res.status(200).send({ ok: true });
    }else{
        return res.status(400).send({ type: "danger", error: "Niedobra ocena!" });
    }
});



module.exports = elkiRouter;