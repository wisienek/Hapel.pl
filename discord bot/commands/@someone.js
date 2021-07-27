

module.exports = function(message, args){
    if(message.channel.type === "dm") return;
    // if(!message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r=>["Moderator","KidMod","tester","Admin Tester"].includes(r.name))){return}
    let user = message.guild.members.cache.random();
    while(user.hasPermission("ADMINISTRATOR")){
        user = message.guild.members.cache.random();
    }
    message.channel.send(user.displayName);
    message.delete();
    return console.log(`${message.member.displayName} Wylosował ${user.displayName}`);
}