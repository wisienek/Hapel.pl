require('dotenv').config();
require('better-logging')(console, {format: ctx => `${ctx.date} ${ctx.time24} ${ctx.type} ${ctx.msg}`});
const chalk = require('chalk');

const Deploy = require('ftp-deploy');
const ftpDeploy = new Deploy();
const fs = require('fs');
 
const config = {
    host : "ec2-3-130-87-105.us-east-2.compute.amazonaws.com",
    user : "ec2-user",
    password: "xxx",
    privateKey: fs.readFileSync(__dirname + '/aws1.ppk'),
    port: 22,
    localRoot: __dirname + '/build',
    remoteRoot: '/home/ec2-user/bot/strona',
    include: [ '*' ],
    sftp: true,
    deleteRemote: false,
    agent: process.env.SSH_AUTH_SOCK
}

ftpDeploy.deploy(config, function(err, res) {
    if (err) console.error(err)
    else console.log('Zaktualizowano build!');
});
ftpDeploy.on("uploading", function(data) {
    data.totalFilesCount; 
    data.transferredFileCount;
    data.filename; 
});
ftpDeploy.on("uploaded", function(data) {
    console.log(`Przesłano plik na serwer: ${chalk.blueBright(data.transferredFileCount)}/${chalk.green(data.totalFilesCount)} - ${chalk.cyan(data.filename)}`); 
});
// ftpDeploy.on("log", function(data) {
//     console.log(data);
// });
ftpDeploy.on("upload-error", function(data) {
    console.error(data.err);
});