const { bot } = require('../../bot');

const log = async ( text ) => {
    try{
        const guild = bot.guilds.cache.get("583031361145667705") || await bot.guilds.fetch("583031361145667705", true, false);
        const logChannel = guild.channels.cache.get("657186504275132421") || await guild.channels.fetch("657186504275132421", true, false);

        if( !logChannel )
            throw "Brak kanału!";

        logChannel.send( text );
        return true;
    }
    catch(er){
        console.error(`DCLog: ${er}`);
        return false;
    };
}

const planLog = async ( text ) => {
    try{
        const guild = bot.guilds.cache.get("583031361145667705");
        const logChannel = guild.channels.cache.get("852305508014751764");

        if( !logChannel )
            throw "Brak kanału!";

        logChannel.send( text );
        return true;
    }
    catch(er){
        console.error(`DCLog plan: ${er}`);
        return false;
    };
}

module.exports = { log, planLog };
