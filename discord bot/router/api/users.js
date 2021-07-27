require('dotenv').config();
const express = require('express');
const usersRouter = express.Router();
const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.NON_PRIVILEGED).add('GUILD_MEMBERS') } });
bot.login(process.env.TOKEN1);

const { p_hplcon, p_hplcon2 } = require('../../databases');

const dev = false;

usersRouter.route("/web")
.get( async (req, res)=> {
    const user = req.user;
    const id = req.query.id;

    if( !user )
        return res.status(503).send({ type: "danger", error: "Musisz być zalogowany! "});

    if( !id )
        return res.status(500).send({ type: "danger", error: "Brak podanego id discorda do fetchowania!" });

    let [ sUser,, err ] = await p_hplcon.query(`SELECT * FROM discordInfo WHERE discord='${id}';`);
    if( err ){
        console.error( err );
        return res.status(400).send({ type: "danger", error: "Błąd w zapytaniu 1 do bazy danych!" });
    }
    sUser = sUser[0] || null;

    if( !sUser ){
        let guild = await bot.guilds.fetch("583031361145667705", true, true);
        if( !guild )
            return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu HIC!" });


        const dcUser = await guild.members.fetch( id, true, true );
        if( !dcUser )
            return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu gracza z HIC!" });


        sUser = { 
            discord: id,
            avatar: dcUser.user.avatarURL(),
            username: dcUser.user.username,
            discriminator: dcUser.user.discriminator,
            hasPerms: dcUser.hasPermission("KICK_MEMBERS")
        }
    }

    return res.status(200).send({ sUser });
});

usersRouter.route("/hic")
.get( (req, res) => {
    const user = req.user;

    if( !user )
        return res.status(401).send({ type: "danger", error: "Brak użytkownika!" });

    const id = req.query.id || user.discord;

    if( !id )
        return res.status(500).send({ type: "danger", error: "Podane konto nie ma discorda? Zaloguj się ponownie!" });

    bot.guilds.fetch("583031361145667705", true, true).then(guild=>{
        guild.members.fetch(id, true, true).then(gosc=>{
            let role = gosc.roles.cache.map(r => { return { id: r.id, permission: r.permissions, name: r.name, color: r.hexColor=="#000000"? "#b2becd": r.hexColor  } });
                
            return res.status(200).send({ role });
        })
        .catch(er => {
            console.error(`api/users/hic get error: ${er}`);
            return res.status(504).send({ type: "danger", error: "Coś poszło nie tak w fetchowaniu konta na hapel-ic" });
        });
    });
});

usersRouter.route("/game")
.get( async (req, res) => {
    const user = req.user;
    if( !user )
        return res.status(400).send({type: "danger", error: "Brak użytkownika!" });
    // const user = { discord: "272037067897307146" };

    const id = req.query.id || user.discord;

    let [ rows,, er ] = await p_hplcon.query(`SELECT * FROM playerInfo WHERE discord='${id}'; `);
    if( er ){
        console.error(er);
        return res.status(504).send({ type: "danger", error: "Bład w zapytaniu bazy 1." });
    }
    if(!rows || rows.length == 0) 
        return res.status(200).send({ rows: [] });

    //mapuj grupy
    let [ groups,, err ] = await p_hplcon2.query(`SELECT permission, uuid FROM luckperms_user_permissions WHERE (${ rows.map(r=>  `uuid='${r.uuid}'` ).join(" OR ") }) AND permission LIKE "group.%"; `);
    if( err ){
        console.error(err);
        return res.status(504).send({ type: "danger", error: "Bład w zapytaniu bazy 2." });
    }
    rows.forEach(r=>{
        r.grupy = groups.filter(g=> g.uuid == r.uuid).map(g=> g.permission.replace("group.","") );
        groups = groups.filter(g=> g.uuid != r.uuid);
    });

    //patreon
    let [ patreon,, err1] = await p_hplcon2.query(`select distinct uuid from 446422_luckperms.luckperms_user_permissions as l where (select count(permission) from 446422_luckperms.luckperms_user_permissions where uuid = l.uuid and permission like "patreon.%") > 0 and (${ rows.map(r=>  `uuid='${r.uuid}'` ).join(" OR ") });`);
    if( err1 ){
        console.error(err1);
        return res.status(504).send({ type: "danger", error: "Bład w zapytaniu bazy 3." });
    }
    patreon = patreon || [];
    patreon.forEach(p=>{
        rows.find(r=> r.uuid == p.uuid).patreon = true;
    });

    return res.status(200).send({ rows });
})
.post( async (req, res) => {
    let { uuid, name, dname, discord } = req.query;

    if( discord == "undefined" || discord == "null" )
        discord = undefined;


    if( !uuid || !name || !dname )
        return res.send({ wyslane: "mało danych" })

    try{
        dname = (dname.match(/\[.*.\]/g) || []).length > 0? dname.match(/\[.*.\]/g)[0] : dname;

        let [ pinfo,, err ] = await p_hplcon.query(`SELECT * FROM playerInfo WHERE uuid='${uuid}';`);
        if( err )
            throw err;

        if( pinfo && pinfo.length > 0 ){
            let user = pinfo[0];

            if( !user ) 
                return;

            if( (discord && user.discord != discord) || (dname && user.displayName != dname) ){
                let [ ,,err1 ] = await p_hplcon.query(`UPDATE playerInfo SET discord='${discord}', displayName='${escapeString(dname)}' WHERE uuid='${uuid}' ;`);
                if(err1){ throw err1 }
    
                dev === true && console.log(`Update konta ${dname} ${name} ${discord}!`);
            }
        }else{
            let [ ,,er ] = await p_hplcon.query(`INSERT INTO playerInfo (nick, uuid ${dname? ", displayName": ""} ${ (discord != "undefined" && discord != undefined) ? ", discord": ""}) VALUES ('${name}', '${uuid}' ${dname? `, '${dname}'`: ""} ${ (discord != "undefined" && discord != undefined)? `, ${discord}`: ""});`);
            if( er ) 
                throw er;
    
            console.log(`Nowy gracz ${dname} ${name} ${discord} ${uuid}`);
        }
    }
    catch(er){
        console.error(`api/users/game post error: ${er}`);
    }

    res.status(200).send({ wyslane: "ok" });
});

usersRouter.route('/edit')
.get( async (req, res) => {
    const user = req.user;
    const { wiek, plec, nick, image } = req.query || null;

    if( !user || !wiek || !plec || !nick || !image )
        return res.status(404).send({ type: "danger", error: "Brak danych!" });

    if( isNaN( parseInt(wiek) ) || wiek <= 0 || wiek > 3000 || (typeof nick != "string" || nick.length < 3) || image.length > 256 || plec.length != 1 )
        return res.status(418).send({ type: "danger", error: "Dziwne dane ;?" });
    
    // update info
    let [ data,, err ] = await p_hplcon.query(`UPDATE playerInfo SET plec='${plec}', wiek='${wiek}', image='${escapeString(image)}' WHERE nick='${nick}' AND discord='${user.discord}';`);
    if ( err ){
        console.error(err);
        return res.status(503).send({ type: "danger", error: "Error z bazą danych!" });
    }     

    return res.status(200).send({ type: "success", error: "Zaktualizowano dane!", ok: true, affected: data.affectedRows });
});

usersRouter.route( "/archive" )
.patch( async (req, res)=> {
    const user = req.user;
    const nick = req.query.nick;

    let arch = 1;

    if( !user || !nick )
        return res.status(403).send({ type: "danger", error: "Brak odpowiednich danych do archiwizacji!" });

    if( typeof user.guilds == "string" )
        user.guilds = JSON.parse( user.guilds );

    let hapelGuild = user?.guilds? user.guilds.filter(g=> g.id == "133227600746250240")[0] : { permissions: "0"};

    const [ rows,, er ] = await p_hplcon.query(`SELECT discord, nick, visible, archived FROM em411_cnpc.playerInfo WHERE nick='${nick}';`);
    if( er ){
        console.error(`Archive patch admin: ${er}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas aktualizacji archiwizacji!" });
    }
    if( !rows || rows.length == 0 )
        return res.status(503).send({ type: "danger", error: `Nie znaleziono konta z nickiem ${nick}!` });

    if( hapelGuild.permissions & 0x2 == 0x2 )
        arch = rows[0].archived == 1? 0: 1;

    if( rows[0].discord != user.discord && hapelGuild.permissions & 0x2 != 0x2 )
        return res.status(403).send({ type: "danger", error: "Próbowałeś zmienić archiwizację nie swojej postaci bez admina!" });

    const [ ,, err ] = await p_hplcon.query(`UPDATE em411_cnpc.playerInfo set archived=${arch} WHERE nick='${nick}';`);
    if( err ){
        console.error(`Archive patch: ${err}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas aktualizacji archiwizacji!" });
    }

    return res.status(200).send({ type: "success", message: (arch == 1)? `Zarchiwizowano postać ${nick}!`: `Wyłączono archiwizację dla ${nick}` });
});

usersRouter.route( "/visible" )
.patch( async (req, res)=> {
    const user = req.user;
    const nick = req.query.nick;

    if( !user || !nick )
        return res.status(403).send({ type: "danger", error: "Brak odpowiednich danych do Zmiany widoczności!" });

    if( typeof user.guilds == "string" )
        user.guilds = JSON.parse( user.guilds );

    let hapelGuild = user?.guilds? user.guilds.filter(g=> g.id == "133227600746250240")[0] : { permissions: "0"};

    const [ rows,, err ] = await p_hplcon.query(`SELECT visible, nick, discord FROM em411_cnpc.playerInfo WHERE nick='${nick}';`);
    if( err ){
        console.error(`Visible patch: ${err}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas pobierania widoczności!" });
    }
    if( !rows || rows.length == 0 )
        return res.status(503).send({ type: "danger", error: `Błąd, nie znaleziono informacji o graczu z nickiem ${nick}!` });

    if( rows[0].discord != user.discord && hapelGuild.permissions & 0x2 != 0x2 )
        return res.status(403).send({ type: "danger", error: "Próbowałeś zmienić widoczność nie swojej postaci bez admina!" });

    const [ ,, err1 ] = await p_hplcon.query(`UPDATE em411_cnpc.playerInfo SET visible='${ rows[0].visible == 0? 1: 0 }' WHERE nick='${nick}';`);
    if( err1 ){
        console.error(`Visible patch: ${err1}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas Zmiany widoczności!" });
    }

    return res.status(200).send({ type: "success", message: "Zmieniono widoczność postaci!" });
});

usersRouter.route(`/sync`)
.post( async (req, res) => {
    try{
        const { discord, uuid } = req.query;

        if( !discord || !uuid ){
            console.error(`Sync DC: No dc/uuid!`);
            return res.status(418).send({ type: "danger", errorr: "Brak DC lub UUID!" });
        }
        dev === true && console.log(`Próba synchronizacji ${discord}`);


        let [ mcGroups,, er1 ] = await p_hplcon2.query(`SELECT permission FROM 446422_luckperms.luckperms_user_permissions WHERE uuid='${uuid}' AND permission like "group.%"; `);
        if( er1 ){
            console.error(`Fetch mc groups: ${er1}`);
            return res.status(503).send({ type: "danger", errorr: "Błąd podczas fetchowania grup mc!" });
        }

        if( !mcGroups || mcGroups.length == 0 )
            return res.status(403).send({ type: "danger", error: "Nie znaleziono grup powiązanych do konta!" });
        
        mcGroups = mcGroups.map(g=> g.permission.replace("group.", ""));


        let guild = await bot.guilds.fetch("583031361145667705", true, true);
        if( !guild )
            return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu HIC!" });


        const dcUser = await guild.members.fetch( discord, true, true );
        if( !dcUser )
            return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu gracza z HIC!" });

        // let dcRoles = dcUser.roles.cache.map(r=> r.name);

        let [ bind,, er2 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.roles WHERE ${ mcGroups.map(g=> `name='${g}'`).join(" OR ") };`);
        if( er2 ){
            console.error(`Fetch bind groups: ${er2}`);
            return res.status(503).send({ type: "danger", errorr: "Błąd podczas fetchowania połączonych grup!" });
        }

        if( !bind || bind.length == 0 )
            return res.status(200).send({ type: 'info', message: "Role są zsynchronizowane!" });


        let [ toAdd,, er3 ] = await p_hplcon.query(`SELECT DISTINCT dcid FROM em411_cnpc.autoRoles WHERE ${bind.map(b=> `name='${b.name}'`).join(" OR ")};`);
        if( er3 ){
            console.error(`Fetch autoroles: ${er3}`);
            return res.status(503).send({ type: "danger", errorr: "Błąd podczas fetchowania połączonych grup do dodania!" });
        }

        if( !toAdd || toAdd.length == 0 )
            return res.status(200).send({ type: 'info', message: "Nie ma ról do dodania!" });

        toAdd.forEach(async (r) => {
            const role = await guild.roles.fetch( r.dcid );

            if(role)
                dcUser.roles.add(role);

            dev === true && console.log(`${dcUser.displayName} dostał ${role? role.name: r.dcid}!`);
        });
        
        return res.status(200).send({ type: 'success', message: "Synchronizowano role!" });
    }
    catch(er){
        dev ===true && console.error(er);
        return res.status(500).send({ type: "danger", error: "Błąd podczas wykonywania kodu!" });
    }
});

usersRouter.route(`/macs`)
.post( async (req, res) => {
    const { mac, uuid, secret } = req.query;

    if( !mac || !uuid || !secret)   return res.status(404).send({ res: "Brak danych!" });
    if( secret != 22 )              return res.status(403).send({ res: "błędny sekret!"});

    let [ r,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.macs WHERE uuid='${ uuid }' AND mac='${ mac }';`);
    if(er) console.error(er);

    if( r.length == 0 ){
        console.log(`Nowy mac ${uuid}: ${mac}!`);
        p_hplcon.query(`INSERT INTO em411_cnpc.macs(mac, uuid) VALUES('${ mac }', '${ uuid }');`);
    }

    return res.status(200).send({res: "posted!"});
})





module.exports = usersRouter;

function escapeString(str){
    if (typeof str != 'string')
        return str;

    return str.replace(/[\0\x08\x09\x1a\n\r"'\\]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\%":
                return "\\\\\%"
            case "\"":
            case "'":
            case "\\":
                return "\\"+char;                 
        }
    });
}