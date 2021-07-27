const fs = require('fs');
const { con } = require('../databases');
const hastebin = require('hastebin-gen');


module.exports = function(message, args){

    if(message.author.id != process.env.woolfid){return}
    let sekwencja = args.join(" ");
    let post=false;
    if(sekwencja.indexOf("-post")>-1){sekwencja = sekwencja.split("-post")[0]; post=true;}
    con.query(sekwencja,(err,rows)=>{
        if(err){message.author.send(err)}
        if(rows&&rows[0]){
            return hastebin(JSON.stringify(rows,null,2), {extension:"json"}).then(haste=>{
                if(post==true){
                    message.channel.send(haste);
                }else{
                    message.author.send(haste);
                }
            }).catch(error=>{
                console.error(error);
                fs.writeFile(`./temp.txt`,JSON.stringify(rows,null,2),err1=>{
                    if(err1)console.error(err1);
                    message.author.send({files:[`./temp.txt`]}).then(()=>{
                        fs.unlinkSync(`./temp.txt`);
                    }).catch(error=>{console.error(error)});
                });
            });
            //message.author.send(`Wynik Query: \`\`\`json ${JSON.stringify(rows,null,2)}\`\`\` `);
        }else{
            return message.author.send(`Brak wyników`);
        }
    });
    console.info(`${message.author.username} użył querry; ${args.join(" ")}`);
}