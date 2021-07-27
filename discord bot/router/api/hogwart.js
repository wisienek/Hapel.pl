const Discord = require('discord.js');
const express = require('express');
const hogwartRouter = express.Router();

const { p_hplcon, p_hplcon2 } = require('../../databases');
const { planLog } = require('./dclog');
const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Brak"];

let dev = false;

hogwartRouter.route('/teachers')
.get(async (req, res) => {

    let [ uuids,, er1 ] = await p_hplcon2.query(`SELECT uuid FROM 446422_luckperms.luckperms_user_permissions where permission='group.nauczyciel' `);
    if( er1 ){
        console.error(`Get teach Uuids: ${er1}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas pobierania uuid nauczycieli!" });
    }
    if( !uuids || uuids.length == 0)
        return res.status(400).send({ type: "warning", error: "Brak uuid nauczycieli!" });

    uuids = uuids.map(u=> `uuid='${u.uuid}'`).join(" OR ");

    let [ nauczyciele,, er2 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.playerInfo WHERE ${uuids}`);
    if( er2 ){
        console.error(`Get teach info: ${er2}`);
        return res.status(503).send({ type: "danger", error: "Błąd podczas pobierania danych nauczycieli!" });
    }
    if( !nauczyciele || nauczyciele.length == 0)
        return res.status(400).send({ type: "warning", error: "Brak info nauczycieli!" });


    return res.status(200).send( nauczyciele );
});

hogwartRouter.route("/planfollow")
.get( async (req, res) => {
    const user = req.user;
    if( !user )
        return res.status(400).send({ type: "warning", error: "Zły argument!" });

    let [ follow,, er ] = await p_hplcon.query(`SELECT kl1, kl2, kl3, kl4 FROM em411_cnpc.planfollow WHERE user='${user.discord}';`);
    if( er ){
        console.error(`Patch get: `, er);
        return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu followa!" });
    }
    if( follow.length == 0 )
        return res.status(200).send({ kl1: 0, kl2: 0, kl3: 0, kl4: 0 });

    return res.status(200).send( follow[0] );
})
.patch( async (req, res) => {
    const { year } = req.query;
    const user = req.user;

    if( [1,2,3,4].indexOf(parseInt(year)) == -1 || !user )
        return res.status(400).send({ type: "warning", error: "Zły argument!" });

    const [ follow,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.planfollow WHERE user='${user.discord}';`);
    if( er ){
        console.error(`Patch get: `, er);
        return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu followa!" });
    }

    if( follow.length == 0 ){
        const [ ,, er1 ] = await p_hplcon.query(`INSERT INTO em411_cnpc.planfollow(user, kl${year}) VALUES('${user.discord}', '1')`);
        if( er1 ){
            console.error(`Patch insert: `, er1);
            return res.status(503).send({ type: "danger", error: "Błąd przy wstawianiu danych!" });
        }
    }else{
        const [ ,, er1 ] = await p_hplcon.query(`UPDATE em411_cnpc.planfollow SET kl${year}='${follow[0][ "kl"+year ] == 0? 1: 0}' WHERE user='${user.discord}';`);
        if( er1 ){
            console.error(`Patch insert: `, er1);
            return res.status(503).send({ type: "danger", error: "Błąd przy wstawianiu danych!" });
        }
    }

    return res.status(200).send({ type: "success", message: `Zmieniono follow dla klasy: ${year}`});
});

hogwartRouter.route('/plan')
.get( async (req, res) => {
    // weź plan

    const [ plan,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.lekcje AS l LEFT JOIN ( select * from em411_cnpc.planExtra where em411_cnpc.planExtra.when > "${new Date().toJSON().slice(0,10).split('-').reverse().join(".")}" ) AS r ON l.id = r.planid;`);
    if( er ){
        console.error(`getplan er:`, er);
        return res.status(503).send({ type: "danger", error: "Błąd przy fetchowaniu planu!" });
    }

    return res.status(200).send({ plan });
})
.delete( async (req, res) => {
    // usuń lekcję
    const { def, user } = req.body;
    dev === true && console.dir( req.body );

    if( user && ( user.hasPerms || user.hasPermsHic || user.isProf ) ){

        const [ lekcja,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.lekcje WHERE id='${ def.id }';`);
        if( er ){
            console.error("fetch lekcje er ", er);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy fetchowaniu lekcji!' });
        }
        if( !lekcja || lekcja.length == 0 )
            return res.status(400).send({ type: 'danger', error: `Brak lekcji o id: ${def.id}` });

        const [ ,,er1 ] = await p_hplcon.query(`DELETE FROM em411_cnpc.lekcje WHERE id='${def.id}'; `);
        if( er1 ){
            console.error("fetch lekcje er ", er1);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy usuwaniu lekcji!' });
        }

        console.info(`${ user.username } usunął lekcję ${ def.id } ${ def.class }OOC ${ def.name } D:${ def.day } ${ def.start } - ${ def.end }`);

        try{
            const embed = new Discord.MessageEmbed()
            .setTitle("Usunięta lekcja!")
            .setAuthor(user.username, user.avatar, "http://hapel-ic.pl/user/"+user.discord)
            .setColor("#cc3300")
            .addField("Klasa", `${ def.class == 4? "Dodatkowe": `klasa ${ def.class }` }`, true)
            .addField("Dzień", `${ days[ def.day ] }`, true)
            .addField("Czas",  `${ def.start } - ${ def.end }`, true)
            .addField("Nazwa", `${ def.name }`)
            .addField("Miejsce", `${ def.place.name }`)
            .addField("Nauczyciel", `${ def.prof.nick }`);

            planLog(embed);
        }
        catch(er){
            console.error(`Błąd przy wysyłaniu logu z lekcji:`, er);
        }

        return res.status(200).send({ type: "success", error: `Usunięto lekcję id:${def.id}!` });
    }else{
        return res.status(401).send({ type: "danger", error: "Nieautoryzowany!" });
    }
})
.post( async (req, res) => {
    // nowa lekcja
    const { lekcja, user } = req.body;

    if( user && ( user.isProf || user.hasPerms || user.hasPermsHic ) ){
        dev === true && console.dir(lekcja);
        
        dev === true && console.log("Checking");
        if( !lekcja )
            return res.status(400).send({ type: "danger", error: "Brak danych!" });

        dev === true && console.log("class");
        if( ( lekcja.class != 0 && !lekcja.class) || [1,2,3,4].indexOf(lekcja.class) == -1 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranej klasie: ${lekcja.class}` });

        dev === true && console.log("day");
        if( ( lekcja.day != 0 && !lekcja.day ) || lekcja.day < 0 || lekcja.day > 6 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranym dniu: ${lekcja.day}` });
        
        dev === true && console.log("start end");
        if( !lekcja.start || !lekcja.end || lekcja.start.match(/\d{2}\:\d{2}/) == null || lekcja.end.match(/\d{2}\:\d{2}/) == null )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranych godzinach: ${lekcja.start}, ${lekcja.end}` });
        
        dev === true && console.log("name, place");
        if( !lekcja.name || !lekcja.place || lekcja.name.length < 3 || lekcja.name.replace(/\W/g, "").length < 3 || lekcja.place.length < 3 || lekcja.place.replace(/\W/g, "").length < 3 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w nazwie: ${lekcja.name}`});
        
        dev === true && console.log("obj prof");
        if( typeof lekcja.prof != "object" || !lekcja.prof.displayName || !lekcja.prof.nick )
            return res.status(400).send({ type: "warning", error: `Niepoprawny profesor: ${JSON.stringify(lekcja.prof)}`});
        
        dev === true && console.log("Fetch lekcje")
        const [ lekcje,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.lekcje WHERE day='${lekcja.day}' AND class='${lekcja.class}' AND start='${lekcja.start}' AND end='${lekcja.end}';`);
        if( er ){
            console.error("fetch lekcje er", er);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy fetchowaniu lekcji!' });
        }
        if( lekcje.length > 0 )
            return res.status(400).send({ type: "danger", error: "Już jest lekcja w tym dniu dla tej klasy o tej godzinie!" });
        
        dev === true && console.log("insert lekcja");
        const [ ,, er1 ] = await p_hplcon.query(`INSERT INTO em411_cnpc.lekcje(day, class, repeating, name, start, end, place, prof) VALUES('${lekcja.day}', '${lekcja.class}', '7', '${lekcja.name}', '${lekcja.start}', '${lekcja.end}', '${ lekcja.place }', '${JSON.stringify(lekcja.prof)}');`)
        if( er1 ){
            console.error("insert lekcje er", er1);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy Dodawaniu lekcji!' });
        }

        console.info(`${ user.username } Dodał nową lekcję ${ lekcja.class }OOC ${ lekcja.name } D:${ lekcja.day } ${ lekcja.start } - ${ lekcja.end }`);
        
        try{
            const embed = new Discord.MessageEmbed()
            .setTitle("Nowa lekcja")
            .setAuthor(user.username, user.avatar, "http://hapel-ic.pl/user/"+user.discord)
            .setColor("#33cc33")
            .addField("Klasa", `${ lekcja.class == 4? "Dodatkowe": `klasa ${ lekcja.class }` }`, true)
            .addField("Dzień", `${ days[ lekcja.day ] }`, true)
            .addField("Czas",  `${ lekcja.start } - ${ lekcja.end }`, true)
            .addField("Nazwa", `${ lekcja.name }`)
            .addField("Miejsce", `${ lekcja.place }`)
            .addField("Nauczyciel", `${ lekcja.prof.nick }`);

            planLog(embed);
        }
        catch(er){
            console.error(`Błąd przy wysyłaniu logu z lekcji:`, er);
        }
        
        return res.status(200).send({ type: "success", message: "Dodano lekcję!" });
    }else{
        return res.status(401).send({ type: "danger", error: `Nieautoryzowany! (${!!user}, ${user.isProf}, ${user.hasPerms})` });
    }
})
.patch( async (req, res) => {
    //edytuj permamentnie lekcje
    const { lekcja, user } = req.body;

    if( user && ( user.isProf || user.hasPerms || user.hasPermsHic ) ){
        
        if( !lekcja )
            return res.status(400).send({ type: "danger", error: "Brak danych!" });
        if( ( lekcja.class != 0 && !lekcja.class) || [1,2,3,4].indexOf(lekcja.class) == -1 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranej klasie: ${lekcja.class}` });
        if( ( lekcja.day != 0 && !lekcja.day ) || lekcja.day < 0 || lekcja.day > 6 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranym dniu: ${lekcja.day}` });
        if( !lekcja.start || !lekcja.end || lekcja.start.match(/\d{2}\:\d{2}/) == null || lekcja.end.match(/\d{2}\:\d{2}/) == null )
            return res.status(400).send({ type: "warning", error: `Błędny argument w wybranych godzinach: ${lekcja.start}, ${lekcja.end}` });
        if( !lekcja.name || !lekcja.place || lekcja.name.length < 3 || lekcja.name.replace(/\W/g, "").length < 3 || lekcja.place.length < 3 || lekcja.place.replace(/\W/g, "").length < 3 )
            return res.status(400).send({ type: "warning", error: `Błędny argument w nazwie: ${lekcja.name}`});
        if( typeof lekcja.prof != "object" || !lekcja.prof.displayName || !lekcja.prof.nick )
            return res.status(400).send({ type: "warning", error: `Niepoprawny profesor: ${JSON.stringify(lekcja.prof)}`});
        
        const [ lekcje,, er ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.lekcje WHERE id='${ lekcja.id }';`);
        if( er ){
            console.error("fetch lekcje er", er);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy fetchowaniu lekcji!' });
        }
        if( lekcje.length == 0 )
            return res.status(400).send({ type: "danger", error: `Nie ma lekcji o podanym id: ${id}` });
        
        const [ ,, er1 ] = await p_hplcon.query(`UPDATE em411_cnpc.lekcje SET day='${ lekcja.day }', class='${ lekcja.class }', name='${ lekcja.name }', start='${ lekcja.start }', end='${ lekcja.end }', place='${ lekcja.place }', prof='${ JSON.stringify( lekcja.prof ) }' WHERE id='${ lekcja.id }';`);
        if( er1 ){
            console.error("Update lekcje er", er1);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy Edytowaniu lekcji!' });
        }

        lekcje[0].prof = JSON.parse(lekcje[0].prof);
        console.info(`${ user.username } Edytował lekcję ${ lekcja.id } kl:${ lekcje[0].class }-${ lekcja.class } ${ lekcje[0].name }-${ lekcja.name } D:${ lekcje[0].day }-${ lekcja.day } (${ lekcje[0].end }-${ lekcja.start }) - (${ lekcje[0].end }-${ lekcja.end })`);
        
        try{
            const embed = new Discord.MessageEmbed()
            .setTitle("Edytowana lekcja")
            .setAuthor( user.username, user.avatar, "http://hapel-ic.pl/user/" + user.discord )
            .setColor("#cc9900")
            .addField("Klasa", `${ lekcje[0].class == 4? "Dodatkowe": `klasa ${ lekcje[0].class }` } -> ${ lekcja.class == 4? "Dodatkowe": `klasa ${ lekcja.class }` }`, true)
            .addField("Dzień", `${ days[ lekcje[0].day ] } -> ${ days[ lekcja.day ] }`, true)
            .addField("Czas",  `${ lekcje[0].start } - ${ lekcje[0].end } -> ${ lekcja.start } - ${ lekcja.end }`, true)
            .addField("Nazwa", `${ lekcje[0].name } -> ${ lekcja.name }`)
            .addField("Miejsce", `${ lekcje[0].place } -> ${ lekcja.place }`)
            .addField("Nauczyciel", `${ lekcje[0].prof.nick } -> ${ lekcja.prof.nick }`);

            planLog(embed);
        }
        catch(er){
            console.error(`Błąd przy wysyłaniu logu z lekcji:`, er);
        }
        
        return res.status(200).send({ type: "success", message: "Edytowano lekcję!" });
    }else{
        return res.status(401).send({ type: "danger", error: `Nieautoryzowany! (${!!user}, ${user.isProf}, ${user.hasPerms})` });
    }
})
.put( async (req, res) => {
    //edytuj tymczasowo lekcję
    const { lekcja, user } = req.body;

    if( (user || req.user) && (user.hasPerms || user.hasPermsHic || user.isProf) ){
        if( !lekcja.temp || !lekcja.id )
            return res.status(400).send({ type: "danger", error: "Nieodpowiednie argumenty!" });

        dev === true && console.dir(lekcja);

        const add = {};
        const embed = new Discord.MessageEmbed()
        .setTitle("Tymczasowe info")
        .setAuthor( user.username, user.avatar, "http://hapel-ic.pl/user/" + user.discord )
        .setColor("#664223")
        .addField("ID", `${ lekcja.id }`);

        add.planid = lekcja.id;

        if( lekcja.day )
            add.Sday = lekcja.day; embed.addField("Dzień", days[ lekcja.day ]);
        if( lekcja.start )
            add.Sstart = lekcja.start; embed.addField("Start", lekcja.start);
        if( lekcja.end )
            add.Send = lekcja.end; embed.addField("Koniec", lekcja.end);
        if( lekcja.place )
            add.Splace = lekcja.place; embed.addField("Miejsce", lekcja.place);
        if( lekcja.prof && typeof lekcja.prof =="object" && Object.keys(lekcja.prof).length > 0 )
            add.Sprof = JSON.stringify(lekcja.prof); embed.addField("Profesor", lekcja.prof.nick);
            
        add.when = lekcja?.when?.split("-")?.reverse()?.join(".") || new Date( Date.now() + 691200000 ).toJSON().replace(/T.*/g, "").split("-").reverse().join(".");
        embed.addField("Do kiedy", lekcja.when);

        let [ lekcje,, er ] = await p_hplcon.query(`SELECT planid FROM em411_cnpc.planExtra WHERE planid='${ lekcja.id }';`);
        if( er ){
            console.error("fetch lekcje extra er", er);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy tymczasowych zmian lekcji!' });
        }
        let query = (lekcje && lekcje.length > 0)?
            `UPDATE em411_cnpc.planExtra SET ${ Object.keys( add ).map(a=> a+`='${ add[ a ] }'` ).join(", ") };`
        :
            `INSERT INTO em411_cnpc.planExtra(${ Object.keys( add ).map(a=> `\`${a}\``).join(", ") }) VALUES(${ Object.values( add ).map(a=> `'${a}'`).join(", ") });`


        let [ ,, er1 ] = await p_hplcon.query( query );
        if( er1 ){
            console.error("Update lekcje extra er", er1);
            return res.status(503).send({ type: 'danger', error: 'Błąd przy Edytowaniu tymczasowych dla lekcji!' });
        }

        try{
            console.info(`${user.username} dodał tymczasowe info do lekcji ${lekcja.id}: ${JSON.stringify(add)}`);
            planLog(embed);
        }
        catch(er){
            console.error(`Błąd przy wysyłaniu logu z lekcji:`, er);
        }

        return res.status(200).send({ type: "success", message: "Dodano tymczasowe zmiany!" });
    }else{
        return res.status(401).send({ type: "danger", error: `Nieautoryzowany! (${!!user}, ${user.isProf}, ${user.hasPerms})` });
    }
});
    
hogwartRouter.route('/punkty')
.patch( async (req, res) => {

    console.log( req.body, req.query );
    

    return res.status(200);
})



module.exports = hogwartRouter;