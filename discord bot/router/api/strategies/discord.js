require('dotenv').config();
const passport = require('passport');

const DiscordStrategy = require("passport-discord");

const { p_hplcon } = require('../../../databases');

passport.serializeUser((user, done) => {
    done(null, user.discord)
});

passport.deserializeUser( async (id, done) => {
    try{
        const [ rows,, er ] = await p_hplcon.query(`SELECT * FROM discordInfo WHERE discord='${id}'; `);
        if(er) throw er;

        if( rows && rows.length > 0 ){
            if( rows[0].blocked == 1 ){
                // console.info("locked");
                return done("Zablokowany", null);
            }
            // console.info("Done!", rows[0]);
            return done( null, rows[0] );
        }

        // console.info("done, null");
        return done( null, null );
    }
    catch(er){
        console.error(er);
        done(er, null);
    }

} );

passport.use( new DiscordStrategy({
        clientID: process.env.hicid,
        clientSecret: process.env.hicsecret,
        callbackURL: process.env.hicredirect,
        scope: ['identify', 'guilds', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const { id, username, discriminator, avatar, guilds, email } = profile;

            const [ rows,, er ] = await p_hplcon.query(`SELECT * FROM discordInfo WHERE discord='${id}';`);
            if(er) throw console.error(er);
            
            let query = rows && rows.length > 0? `UPDATE discordInfo SET username='${username}', discriminator='${discriminator}', avatar='https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=256', guilds='${escapeString(JSON.stringify(guilds))}' WHERE discord='${id}'; `: `INSERT INTO discordInfo(discord, username, discriminator, avatar, guilds, email) VALUES('${id}', '${username}', '${discriminator}', 'https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=256', '${escapeString(JSON.stringify(guilds))}', '${ email }'); `;
            let [ ,, err ] = await p_hplcon.query(query);
            if( err ) throw err;

            let [ _rows,, _er ] = await p_hplcon.query(`SELECT * FROM discordInfo WHERE discord='${id}';`);
            if( _er ) 
                throw _er;


            if( _rows && _rows.length > 0 ){
                const user = _rows[0];
                user.guilds = JSON.parse(user.guilds);
                let hapelGuild = user.guilds.filter(g=> g.id == "133227600746250240")[0] || { permissions: "0"};
                let hicGuild =  user.guilds.filter(g=> g.id == "583031361145667705")[0]  || { permissions: "0"};

                user.hasPerms = hapelGuild.permissions  & 0x2 == 0x2;
                user.hasPermsHic = hicGuild.permissions & 0x2 == 0x2;

                return done(null, user);
            }

            return done(new Error("jakiś error"));
        }
        catch(er){
            console.error(er);
            return done(er, null);
        }
    })
);


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