const fs = require('fs');

const cmdFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
const commands = {};

for (const file of cmdFiles) {
	const command = require(`./commands/${file}`);
	commands[file.replace(/\.js/i, "")] = command;
}

console.info(`Załadowano komendy: ${Object.keys(commands).join(", ")}`);

module.exports = async function(message, bot){

    if(message.channel.type != "dm" && message.guild.id=="522449658505723905" && message.author.id!=process.env.woolfid){
        return;
    }
    if(message.author.bot) return;    //jeżeli PW bota lub bot jest autorem wróć
    //if(message.channel.type === "dm") return;
    let prefix = ";";  // prefix komend: `!!`, podziel wyrazy na tablice
    let messageArray = message.content.split(" "); //oddziel wyrazy spacją
    let cmd = messageArray[0].toLowerCase();  //cmd = pierwszy wyraz
    let args = messageArray.slice(1); //oddziel cmd od reszty

    if(cmd[0] == prefix){
        cmd = cmd.substring(1);
        if(!commands[cmd]) return message.author.send(`Nie znaleziono komendy: \`${cmd}\``);
    
        commands[cmd](message, args, bot);
    }

};