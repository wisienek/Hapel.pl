// const hastebin = require("hastebin-gen");


// module.exports = function (message, args){
//     if(message.channel.type === "dm") return;
//     if(message.member.hasPermission("ADMINISTRATOR") || message.member.id==process.env.woolfid){
//         if(!args[0]){return message.author.send(`Oznacz @rolę`)}
//         let rola = message.mentions.roles.first() || message.guild.roles.find(r=>{r.name==args[0]});
//         if(!rola){return message.author.send(`Nie znaleziono roli ${args[0]}`)}
//         let lista = `Usunięto rolę ${rola.name} użytkownikom:\n`;
//         message.guild.members.forEach(m=>{if(m.roles.has(rola.id)){m.removeRole(rola); lista+=`- ${m.displayName}\n`;}});
//         message.react(bot.emojis.get(`634479516215017472`));
//         console.info(`${message.member.displayName} Usunął użytkownikom rolę ${rola.name}`);
//         if(lista.length<2000){return message.author.send(lista);}else{
//             return hastebin(JSON.stringify(lista,null,2), {extension:"text"}).then(haste=>{
//                 message.author.send(haste);
//             }).catch(error=>{console.error(error)});
//         }
//     }else{return}
// }