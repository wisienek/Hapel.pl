module.exports = function(message, args){
    if(message.member.id!=process.env.woolfid){return}

    message.delete();
    let chan = message.mentions.channels.first();
    if(!chan){return message.author.send(`Nie oznaczono kanału`)}
    if(!args[1]){return message.author.send(`Nie ma argumentów`)}

    console.warn(`${message.member.displayName} Wysłał wiadomość na ${chan.name}: ${message.content.split(`${args[0]} `)[1]} !`);
    return chan.send(message.content.split(`${args[0]} `)[1]);
}