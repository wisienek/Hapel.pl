


module.exports = function( message, args ){
    if(message.channel.type === "dm") return;
    //if(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r=>["tester","Admin Tester"].includes(r.name))){
        if(!args[0]){return message.author.send("oznacz rolę")}
        let rola = message.mentions.roles.first() || message.guild.roles.cache.find(r=> r.name.toLocaleLowerCase().includes(args.join(" ").toLocaleLowerCase()));
        if(!rola){message.delete(); message.author.send("Nie znaleziono roli"); return}
        let lista = `${rola.name}:\n`;
        message.guild.roles.fetch(`${rola.id}`, true, true).then(r=>{
            const role = message.guild.roles.resolve(r);
            console.log(role.name, role.members);

            r.members.forEach(m=>{lista+=`-${m.displayName}     (\`${m.id}\`)\n`;});
            if(lista.length>2000){
                hastebin(JSON.stringify(lista,null,2), {extension:"text"}).then(haste=>{
                    message.author.send(haste);
                }).catch(error=>{console.error(error)});
            }else{
                message.author.send(lista);
            }
        })
        message.delete();
        return console.log(`${message.member.displayName} wyciągnął listę użytkowników z grupy ${rola.name}`);
    //}
}