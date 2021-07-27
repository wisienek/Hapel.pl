require('dotenv').config();
module.exports = function (message, args, bot){
    if(message.member.id==process.env.woolfid){
        if(!args[0]){return message.author.send("Podaj nazwę serwera")}

        let szukane = bot.guilds.cache.find(guild => { console.log(`guild: ${guild.name} == ${args.join(" ")}`); return guild.name == args.join(" ")});
        if(szukane){
            try{
                szukane.leave();
                console.info(`${message.member.displayName} Forsował wyjście z ${args.join(" ")}`);
            }
            catch(er){
                console.error(er);
            }
        }
    }
}