const express = require('express');
const passport = require('passport');
const dcRouter = express.Router();


const { bot } = require('../../bot');
const { log } = require("./dclog");


dcRouter.get( '/', async (req, res) => {
    let ip = req.ip.replace(/\:.*\:/g, "");

    if( req.headers.origin && req.headers.origin === "http://localhost:3000" )
        return res.status(200).send({ 
            username: "HIC bot", 
            created: "2021-04-27", 
            discriminator: "1621", 
            avatar: "https://cdn.discordapp.com/avatars/541718549119631370/3fbbdd5bcf7c803c25bccf1d1b011b13.webp?size=256", 
            discord: "541718549119631370", 
            isProf: true, hasPerms: true, hasPermsHic: true, isSubscribed: true, isPatreon: true,
            guilds: [
                {"id":"133227600746250240","name":"Hapel.pl 🎂 10 LAT","icon":"daacd31ec8342ca7960f84baf7771dbb","owner":false,"permissions":1475866199,"features":["ANIMATED_ICON","WELCOME_SCREEN_ENABLED","COMMUNITY","INVITE_SPLASH","NEWS"],"permissions_new":"110997532247"},
                {"id":"583031361145667705","name":"Hapel.pl - IC","icon":"050a2c7c3ffd0d52d9ef8409e38b5294","owner":false,"permissions":2147483647,"features":["PREVIEW_ENABLED","WELCOME_SCREEN_ENABLED","COMMUNITY","NEWS","MEMBER_VERIFICATION_GATE_ENABLED"],"permissions_new":"137438953471"}
            ]
        }) && log(`Załadowano dummy usera dla ||${ (ip == "193.188.199.2")? "Woolfa": ip }||`) && console.warn(`Załadowano dummy usera dla ${ip}`);


    if( req.user ){
        let user = req.user;

        try{
            user.guilds = JSON.parse( user.guilds );
            let hapelGuild = user.guilds.filter(g=> g.id == "133227600746250240")[0] || { permissions: "0" };
            let hicGuild =  user.guilds.filter(g=> g.id == "583031361145667705")[0]  || { permissions: "0" };
    
            user.hasPerms = hapelGuild.permissions  & 0x2 == 0x2;
            user.hasPermsHic = hicGuild.permissions & 0x2 == 0x2;

            const hic = await bot.guilds.fetch("583031361145667705", true, true);
            const gosc = await hic.members.fetch( user.discord, true, true );
            const role = gosc.roles.cache;

            user.isProf = role.some(r=> r.id == "583247238281691137" || r.id == "585498421235023873" );
        }
        catch(er){
            console.error(`userget er: `, er);
        }
        finally{
            req.user = user;
            res.user = user;
            res.send( user );
        }
    }else{
        return res.status(401).send({ msg: "nieautoryzowany"});
    }
});

dcRouter.get( "/logout", (req, res) => {
    console.log(`[WEB] Wylogowano ${req.user.username}`);
    req.logOut();
    req.session.destroy( ( err ) => {
        if( err )
            return res.status(400).send({ type: "danger", error: err});
        
        return res.status(200).clearCookie( "connect.sid", { path: "/" } ).send({ type: "info", message: "wylogowano!" });
    });
})

dcRouter.get( "/auth", passport.authenticate('discord') );

dcRouter.get( "/redirect", passport.authenticate('discord'), (req, res)=>{
    console.log(`[WEB] Zalogowano ${req.user.username}!`) && log(`[WEB] Zalogowano ${req.user.username}!`);
    res.user = req.user;
    res.redirect("http://hapel-ic.pl/");
});



module.exports = dcRouter;

