module.exports = function (message,args) {
    if(message.channel.type === "dm") return;

    let helpembed = new Discord.MessageEmbed()
    .setColor('GREEN').setDescription('Helper')
    .addField(`Inne:`, `${prefix}embed <tytuł> /-/ <wiadomość> /-/ <obraze\*> - wysyła wiadomość osadzoną jak ta. (ostatnie /-/ i obrazek jest zbędne.)\n${prefix}reload - odświeża podstawowe informacje w bazie danych. Dodając \`-r\` archiwizuje konto i tworzy nowe. `);

    if(message.member.hasPermission("ADMINISTRATOR")||marole(message.member.roles.cache, [])){
        let adminembed = new Discord.MessageEmbed()
        .setColor('RED').setDescription('Helper Admin')
        if(message.member.id==process.env.woolfid || marole(message.member.roles.cache, HeadAdmins)){
            let hadminembed = new Discord.MessageEmbed().setDescription('H@/DEV helper').setColor('BLUE')
            .addField(`Role Manager:`, `${prefix}r-r @rola - usuwa **Wszystkim** użytkownikom daną rolę (niebezpieczne!)\n${prefix}r-list <-f> - wyświetla listę id roli, \`-f\` daje ją do pliku .txt `)
            .addField(`Inne:`, `${prefix}query <jakiś dziwny kod sql> - wysyła query do bazy danych`);
            message.member.send(hadminembed);
            message.member.send(adminembed);
        }else{
            message.member.send(adminembed);
        }
    }

    message.member.send(helpembed);
    console.log(`Wysłano ${message.member.displayName} helpa`);
    return message.delete();
}