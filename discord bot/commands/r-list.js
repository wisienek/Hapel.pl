const fs = require('fs');

module.exports = function(message, args){
    if(message.channel.type === "dm") return;
    if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r=>["tester","Admin Tester"].includes(r.name))){
        let x = message.guild.roles.cache.map(r=> `${r.id} -=- ${r.name}`).join("\n");
        if(args[0]==`-f` || x.length >= 2000){
            fs.writeFileSync(`./role.txt`, x);
            message.member.send({ files: [`./role.txt`] }).then(()=>{
                message.react(bot.emojis.cache.get("634479516215017472"));
                fs.unlinkSync(`./role.txt`);
                return console.log(`Wysłano listę roli ${message.member.displayName}`);
            }).catch(err=>{if(err)console.error});
        }else{
            return message.author.send(x);
        }
    }
}