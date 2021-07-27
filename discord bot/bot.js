require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.NON_PRIVILEGED).add('GUILD_MEMBERS') } });
//zacznij bot

bot.on('error', console.error);

bot.on('ready', () => {
    console.info('bot ready');

    bot.guilds.cache.forEach(guild=>{
        console.info(`Hapel-Ic załadował ${guild.name}`);
    });
});


const commandHandler = require('./commands');
bot.on("message", async message => commandHandler(message, bot) );


bot.login( process.env.TOKEN1 );


module.exports = { bot };