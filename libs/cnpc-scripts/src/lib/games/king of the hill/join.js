var API = Java.type("noppes.npcs.api.NpcAPI").Instance();

//join
function interact(e){
    var wdata = e.player.world.getStoreddata();
    var players = wdata.get('hillplayers');
    var state = wdata.get('hill');
    if(state=="start"){return e.player.message("[§cGame§f] §7Gra już wystartowała!")}
    if(players) { players = JSON.parse(players) } else { players = [] }
    if(players.indexOf(e.player.getName())>-1){
        return e.player.message("[§cGame§f] §7Jesteś już w grze!");
    }
    players.push(e.player.getName());
    broadcast(e.player.getName()+" Dołączył do gry!");
    e.player.message("[§cGame§f] §7Dołączono do gry!");
    wdata.put('hillplayers', JSON.stringify(players));

}

//leave
function interact(e){
    var wdata = e.player.world.getStoreddata();
    var players = wdata.get('hillplayers');
    var state = wdata.get('hill');
    if(state=="start"){return e.player.message("[§cGame§f] §7Gra już wystartowała!")}
    if(players) { players = JSON.parse(players) } else { players = [] }
    var ppos = players.indexOf(e.player.getName());
    if(ppos==-1){
        return e.player.message("[§cGame§f] §7Nie ma cię już w grze!");
    }
    players.splice(ppos,1);
    e.player.message("[§cGame§f] §7Usunięto z gry!");
    wdata.put('hillplayers', JSON.stringify(players));
    broadcast(e.player.getName()+" Odszedł z gry!");
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