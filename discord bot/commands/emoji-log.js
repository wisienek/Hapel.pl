const hastebin = require('hastebin-gen');

module.exports = function(message, args){
    if(message.channel.type === "dm") return;
    if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r=>["tester","Admin Tester"].includes(r.name))){
        let logs =`Lista Emoji: \n`;
        message.guild.emojis.cache.forEach(e=>{
            logs+=`${e.id} | ${e.name}\n`;
        });
        if(logs.length > 2000){
            hastebin(logs, {extension:"text"}).then(haste=>{
                message.author.send(haste);
            }).catch(error=>{console.error(error)});
        }else{
            message.author.send(logs);
        }
        return message.delete();
    }
}