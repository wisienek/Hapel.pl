const Discord = require("discord.js");

module.exports = function(message, args){

    //if(!message.author.id == process.env.woolfid || message.member.hasPermission("ADMINISTRATOR")){return;}
    let emb = args.join(" ").split('/-/');
    if(!emb[1]){return message.reply(`Podaj treść wiadomości; \n\`${prefix}embed Tytuł wiadomości /-/ treść wiadomości\n?embed Tytuł wiadomości /-/ Treść wiadomości /-/ Link do obrazka \``)}
    if(emb[2]){
        let tempembed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor('RANDOM')
        .setThumbnail(emb[2])
        .addField(`${emb[0]}`,`${emb[1]}`);
        message.channel.send(tempembed);
    }else{
        if(emb[1]){
            let tempembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor('RANDOM')
            .addField(`${emb[0]}`,`${emb[1]}`);
            message.channel.send(tempembed);
        }else{return;}
    }
    message.delete();

}