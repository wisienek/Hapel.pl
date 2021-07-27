const fs = require('fs');
const QuickChart = require('quickchart-js');

const { con } = require('../databases');


module.exports = function(message, args){

    if(message.channel.type === "dm") return;
    if(args.length == 0){
        con.query(`SELECT data, ilosc, gracze, czas FROM online;`,(er,rows)=>{
            if(er) return console.error(er);
            if(rows && rows.length > 0){
                fs.writeFile(`./temp.txt`, JSON.stringify(rows,null,2), f => {
                    message.author.send("Plik z danymi od początku!", { files: ['./temp.txt']}).then(()=>{
                        fs.unlinkSync('./temp.txt');
                        console.info(`${message.author.username} Wziął wszystkie statystyki!`);
                        return message.react("👍");
                    });
                });
            }else{
                return message.author.send("Nie znaleziono wyników w bazie!");
            }
        });
    }else
    if(args[0] && args[0] == "help"){
        return message.author.send(`\`${prefix}stats \` - wysyła wszystkie pola.\n\`${prefix}stats <m:01 / d:01 / x:MM-DD>\` - wysyła z pierwszego miesiąca / dnia\n\`${prefix}stats t\` - wysyła statystyki z dzisiaj `);
    }else
    if(args[0] && (args[0].indexOf("d:")>-1 || args[0].indexOf("m:")>-1 || args[0].indexOf("x:")>-1)){
        let w;
        if(args[0].indexOf('d:')>-1){ w = '____-__-'+args[0].split("d:")[1] }else
        if(args[0].indexOf('m:')>-1){ w = '____-'+args[0].split('m:')[1]+'-__'}else 
        if(args[0].indexOf('x:')>-1){ w = '____-'+args[0].split('x:')[1]}else
        if(args[0] == 't'){ let x = new Date(); w = (x.getFullYear())+"-"(x.getMonth()+1)+"-"+(x.getDate()); }else{
            return message.author.send(`Złe argumenty: \`${args[0]}\``);
        }
        con.query(`SELECT data, ilosc, gracze, czas FROM online WHERE data LIKE '${w}'; `, (er, rows)=>{
            if(er) return console.error(er);
            if(rows && rows.length > 0){
                fs.writeFile(`./temp.txt`, JSON.stringify(rows,null,2), f => {
                    message.author.send(`Plik z danymi ${args[0]}!`, { files: ['./temp.txt']}).then(()=>{
                        fs.unlinkSync('./temp.txt');
                        console.info(`${message.author.username} Wziął statystyki z ${w}!`);
                        return message.react("👍");
                    });
                });
            }else{
                return message.author.send("Nie znaleziono wyników w bazie!");
            }
        });
    }else if(args[0] && args[0] == "chart"){
        if(!args[1]){ return message.author.send("Brak podaj rok i miesiąc w formacie: \`2020-12\`")}

        con.query(`SELECT data, ilosc, gracze, czas FROM online WHERE data like '${args[1]}%'; `,(er,rows)=>{
            if(er) console.error(er);
            if(rows && rows.length > 0){

                let labels = new Set();
                let g20 = [];
                let g21 = [];

                rows.forEach(r=>{
                    r.czas == "20:0" ? g20.push(r.ilosc) : g21.push(r.ilosc);
                    let data = new Date(r.data);
                    labels.add(`${data.getDate()}.${data.getMonth()+1}`);
                });
                
                let chartdata = {
                    type: 'bar',
                    data: {
                        labels: [...labels],
                        datasets: [{
                                label: "Godzina 20:00",
                                data: g20
                            },
                            {
                                label: "godzina 21:00",
                                data: g21
                            }
                        ]
                    }
                };
                const myChart = new QuickChart();
                myChart
                .setConfig(chartdata)
                .setWidth(1600)
                .setHeight(800)
                .setBackgroundColor('transparent');
                
                return message.author.send(myChart.getUrl());
            }else{
                return message.author.send(`Nie znaleziono wyników dla: \`${args[1]}\` `);
            }
        });
    }

}