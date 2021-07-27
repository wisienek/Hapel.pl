var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
function interact(e){
    var wdata = API.getIWorlds()[0].getStoreddata();
    var crown = wdata.get('crown');
    var state = wdata.get('hill');
    if(state=="start"){return e.player.message("[§cGame§f] §7Gra jest już wystartowana!")}
    var players = wdata.get('hillplayers');
    if(players) { players = JSON.parse(players) } else { players = [] }
    if(players.length<3){return e.player.message("[§cGame§f] §7Musi być przynajmniej 3 graczy!")}
    state = "start";
    wdata.put('hill',state);

    e.player.message("§aGracze: §c"+players);
    e.player.message("§aState: §c"+state);
    e.player.message("§aKorona: §c"+crown);

    broadcast("Gra rozpoczęła się! (czas 5min)");

    var timers = e.npc.getTimers();
    timers.forceStart(404, 6000, false);

}

function timer(e){
    if(e.id==404){
        var wdata = API.getIWorlds()[0].getStoreddata();
        var state = wdata.get('hill');
        var king = wdata.get('king');
        var players = wdata.get('hillplayers');
        if( !king ){ broadcast('Koniec gry! Nikt nie wygrał rundy.') }
        else{ broadcast('Wygrał §e'+king+"§7!") }
        var p = API.getIWorlds()[0].getPlayer(king);
        if( p ){
            var item = API.getIWorlds()[0].createItem("variedcommodities:crown2",0,1);
            item.setCustomName("§cKorona Króla Góry");
            item.setLore(["§7Wygrana w grze King of the hill","§7Jesteś jednym z najlepszych obrońców!"]);
            var item1 = API.getIWorlds()[0].createItem("variedcommodities:coin_emerald",0,2);
            item1.setCustomName("§aPunkt gracza");
            item1.setLore(["§7Pieniążek zwycięzcy","§7Możesz go wymienić na różne ulepszenia!"]);

            p.giveItem(item1);
            p.giveItem(item);

            var x = "Gracz **"+p.getName()+"** Wygral gre `King of The Hill`!\nUczestnicy: "+players;
            x=ang(x);
            HTTP.post("https://discordapp.com/api/webhooks/666382348262309894/V7UiHY3eRewJz4wD_7pyR7uYRv8VgYmwLsr9QCSIv6EID-PMPeeDz4OciQ5Ina6R6Kry",{
                "content": x,
                "tts": false,
            });
        }

        state = 'stop';
        king='';
        wdata.put('hill',state);
        wdata.put('king',king);
        wdata.put('hillplayers','[]');

        return;
    }
}






function broadcast(txt){
    var wdata = API.getIWorlds()[0].getStoreddata();
    var players = wdata.get('hillplayers');
    if(players) { players = JSON.parse(players) } else { players = [] }
    for(var i=0; i<players.length; i++){
        var p = API.getIWorlds()[0].getPlayer(players[i]);
        p.message("[§cGame§f] §7"+txt);
    }
}