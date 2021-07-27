require('dotenv').config();
require('better-logging')(console, {format: ctx => `${ctx.date} ${ctx.time24} ${ctx.type} ${ctx.msg}`});
const schedule = require('node-schedule');
const request = require('request');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const expressSession = require('express-session');
const FileStore = require('express-mysql-session')(expressSession);
const path = require('path');
const cors = require('cors');

const { bot } = require('./bot');
const { log } = require('./router/api/dclog');

const Router = require('./router/main');
const passport = require("passport");
require('./router/api/strategies/discord');

//const socektio = require('socket.io');

//połącz db
const { con, hplcon, p_hplcon } = require('./databases');

//dla express
app.set( 'views', path.join( __dirname, "strona" ) );

app.use( async function(req, res, next) {
    // let [ ips,, ] = await p_hplcon.query(`SELECT ip FROM em411_cnpc.betaTests;`);
    // let allowedIps = (!ips || ips.length==0)? []: ips.map(ip=> ip.ip);
    // 
    // if( allowedIps.indexOf( req.ip.replace(/\:.*.\:/g, "") ) == -1 )
    //     return res.status(403).send({ error: "Nie jesteś na liście dozwolonych!" });
    

    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static(__dirname+'/strona/') );

app.use( cors({ credentials: true, origin: ["http://localhost:3000", "*"] }) ); 
app.use( cookieParser('ssh!quiet.it/') );

const sessionStore = new FileStore({
    expiration: 365 * 24 * 60 * 60 * 1000,
    createDatabaseTable: false
}, p_hplcon );

app.use( expressSession({
    key: 'hpl-ic',
    name: 'sid',
    secret: 'ssh!quiet.it/',
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        expires: false
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}) );


app.use( passport.initialize() );
app.use( passport.session() );

app.use('/api', Router);

app.listen( 80 );

app.get('*', (req, res)=>{
    res.sendFile( path.join(__dirname + '/strona/index.html') );
});
//kończ express


//schedule jobs
const serverOnline = schedule.scheduleJob('0 0 20-21 * * *', function(){
    request("https://api.mcsrvstat.us/2/51.83.193.68:25923", { json: true }, (err, res, body) => {
        if (err) { return console.error(err); }
        if(!body){ return console.warn(`Nie udało się pobrać danych z serwera!`) }
        if(!body.players){ return console.warn(`Server jest offline!`) }
    
        let x = new Date();
        let dzis = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`;
        let czas = `${x.getHours()}:${x.getMinutes()}`;
        hplcon.query(`INSERT INTO online(data, czas, ilosc, gracze) VALUES ('${dzis}', '${czas}', '${body.players.online}', '${JSON.stringify(body.players.list)}')`,(err)=>{
            if(err)console.error;
            console.info(`Zrobiono ustalony Update graczy: ${body.players.online}`);
            log(`Zrobiono dzienny Update graczy: ${body.players.online}`);
        });
    });
});

const deleteZlane = schedule.scheduleJob("0 0 22 1 * *", function(){
    const week = 2 * 7 * 24 * 60 * 60 * 1000;
    hplcon.query(`DELETE FROM Zlane where data between 0 and ${Date.now() - week};`, (er,rows)=>{
        if(er) console.error(er);
        console.log(`Usunięto stare zlane eliksiry aż do ostateniego tygodnia!`);
        log(`Miesięczne czyszczenie - usunięto zlane eliksiry starsze niż 2 tyg.`);
    });
});

const powiadomLekcje = schedule.scheduleJob("0 30 15 * * *", async function(){
    console.info(`Próbuję powiadomienia!`);
    try{
        let [ rows,, er ] = await p_hplcon.query(`SELECT user, kl1, kl2, kl3, kl4 FROM em411_cnpc.planfollow WHERE kl1=1 OR kl2=1 OR kl3=1 OR kl4=1; `);
        if( er ) {
            console.error("Powiadom lekcje: " + er);
            throw "Powiadom lekcje: " + er;
        }
    
        let [ rows1,, er1 ] = await p_hplcon.query(`SELECT * FROM em411_cnpc.lekcje as l left JOIN ( select * from em411_cnpc.planExtra where em411_cnpc.planExtra.when > "${new Date().toJSON().slice(0,10).split('-').reverse().join(".")}" ) as r ON l.id=r.planid where l.day='${new Date().getDay()}' ORDER BY l.class, l.start, r.Sstart ASC;`);
        if( er1 ) {
            console.error("get lekcje: " + er1);
            throw "get lekcje: " + er1;
        }
    
        rows1 = rows1 || [];
    
        const kl1 = rows1.filter(l=> l.class == 1).map( klassMap ).join("\n");
        const kl2 = rows1.filter(l=> l.class == 2).map( klassMap ).join("\n");
        const kl3 = rows1.filter(l=> l.class == 3).map( klassMap ).join("\n");
        const kl4 = rows1.filter(l=> l.class == 4).map( klassMap ).join("\n");
    
        rows.forEach(async (r) => {
            console.log(r);
            const gosc = await bot.users.fetch( r.user, true, true );
            let message = `Uwaga, dzisiejsze zajęcia: `;
            if( r.kl1 == 1 && kl1.length > 0 )
                message += `\nKlasa 1:\n\`\`\`${kl1}\`\`\``;
            if( r.kl2 == 1 && kl2.length > 0 )
                message += `\nKlasa 2:\n\`\`\`${kl2}\`\`\``;
            if( r.kl3 == 1 && kl3.length > 0 )
                message += `\nKlasa 3:\n\`\`\`${kl3}\`\`\``;
            if( r.kl4 == 1 && kl4.length > 0 )
                message += `\nDodatkowe:\n\`\`\`${kl4}\`\`\``;
    
            gosc.send( message );
        });
    }
    catch(er){
        console.error(er);
    }

});

