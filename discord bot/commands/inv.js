

module.exports = function (message, args, bot){
    if(message.member.id==process.env.woolfid){
        if(!args[0]){return message.author.send("Podaj nazwę serwera- args[0]")}
        let szukane = bot.guilds.cache.find(guild=> guild.name == args[0]);
        szukane.channels.first().createInvite().then(invite=> message.channel.send('Found Invite:\n' + invite.code)).catch(err=>{console.error(err)});
    }else{return}
}