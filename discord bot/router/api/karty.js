const express = require('express');
const kartyRouter = express.Router();

const { p_hplcon } = require('../../databases');


kartyRouter.route('/')
.get(async (req,res) => {
    const [ rows,, er ] = await p_hplcon.query(`SELECT * FROM karty;`);
    if(er){
        console.error(er);
        return res.status(504).send({ type: "danger", error: "Error z bazą danych przy fetchowaniu Kart"});
    }
    if(!rows || rows.length == 0){
        return res.status(500).send({ type: "warning", error: "Brak wyników z bazy!" });
    }

    return res.status(200).send( {rows} );
});

kartyRouter.route('/moje')
.get(async (req, res) => {
    const user = req.user;
    const id = req.query.id;

    if( !user )
        return res.status(503).send({ type: "danger", error: "Nie podano usera!"});


    const [ rows,, err ] = await p_hplcon.query(`SELECT * FROM playerInfo WHERE discord='${id}';`);
    if( err ){
        console.error( `Fetch playerinfo: ${err}` );
        return res.status(504).send({ type:"danger", error:"Błąd w bazie danych!" });
    }
    if( !rows || rows.length == 0 )
        return res.status(500).send({ type: "warning", error: "Brak połączonych kont z discordem!" });

    let uuids = rows.map(r => `uuid='${r.uuid}'`);


    const [ row,, er ] = await p_hplcon.query(`SELECT * FROM mojeKarty WHERE ${uuids.join(" OR ")} ORDER BY karta ASC;`);
    if( er ){
        console.error(`Mojekarty fetch: ${er}`);
        return res.status(504).send({ type:"danger", error:"Błąd w bazie danych!"});
    }
    if(!row || row.length == 0)
        return res.status(500).send({ type: "info", error: `Konto ${id} nie ma kart! Kliknij PPM ingame na kartę aby dodać.` });

    return res.status(200).send({rows: row});
})
.post(async (req, res) => {
    let { id, uuid, name, dname, discord } = req.query;
    dname = dname.match(/\[.*.\]/g)[0];

    
    const [ rows,, err ] = await p_hplcon.query(`SELECT * FROM playerInfo WHERE uuid='${uuid}';`);
    if( err ){
        console.error(`Select playerinfo: ${err}`);
        // return res.status(503).send({ type: "danger", error: "Błąd w fetchowaniu informacji gracza!" });
    }
    if( !rows || rows.length == 0 ){
        let [ ,,er ] = await p_hplcon.query(`INSERT INTO playerInfo (discord, nick, uuid ${dname? ", displayName": ""}) VALUES ('${discord}', '${name}', '${uuid}' ${dname? `, '${dname}'`: ""});`);
        
        if( er ){
            console.error(`playerinfo insert: ${er}`);
            // return res.status(503).send({ type: "danger", error: "Błąd w zamieszczaniu info o graczu!" });
        }
    }


    const [ row,, er ] = await p_hplcon.query(`SELECT * FROM mojeKarty WHERE karta='${id}' AND uuid='${uuid}';`);
    if( er ){
        console.error(`fetch karty, karta: ${er}`);
        return res.status(503).send({ type: "danger", error: `Błąd przy fetchowaniu karty ${id}!` });
    }
    if( !row || row.length == 0 ){
        let [ ,,err1 ] = await p_hplcon.query(`INSERT INTO mojeKarty(karta, uuid) VALUES (${id}, '${uuid}');`);
        if( err1 ){
            console.error(`insert karta: ${err1}`);
            return res.status(503).send({ type: "danger", error: `Coś poszło nie tak w insercie karty ${id}` });
        }

        console.log( "Nowa karta: ", id, uuid, name, dname, discord);
        return res.status(200).send({ wyslane: true, modyfikowane: 1 });
    }

    return res.status(200).send({ wyslane: true, modyfikowane: 0 });
});






module.exports = kartyRouter;