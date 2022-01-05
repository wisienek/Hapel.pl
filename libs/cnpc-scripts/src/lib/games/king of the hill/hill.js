var king;
var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
function init(e){
    var wdata = API.getIWorlds()[0].getStoreddata();
    if(wdata.get('king')){
        king = wdata.get("king");
        e.block.setModel("minecraft:netherrack");
    }else{
        e.block.setModel("minecraft:gold_block");
    }
    
    wdata.put('crown', JSON.stringify([e.block.getX(), e.block.getY(), e.block.getZ()]));
}    

function interact(e){
    var wdata = API.getIWorlds()[0].getStoreddata();
    if(!wdata.get('hill') || wdata.get('hill')=="stop"){return e.player.message("[§cGame§f] §7Gra jest zatrzymana!")}
    var players = wdata.get('hillplayers');
    if(players) { players = JSON.parse(players) } else { players = [] }
    if(players.indexOf(e.player.getName())==-1){return e.player.message("[§cGame§f] §7Nie jesteś w grze!")}

    if(!king){
        king = e.player.getName();
        wdata.put('king', king);
        var timers = e.block.getTimers();
        timers.forceStart(1, 20, true); //co sekundę
        broadcast(e.player.getName()+" Porwał koronę!");
        e.block.setModel("minecraft:netherrack");
    }else{
        return e.player.message("[§cGame§f] §7Królem już jest: "+king);
    }
}

function timer(e){
    var wdata = API.getIWorlds()[0].getStoreddata();
    if(wdata.get('hill')=="stop"){
        return e.block.getTimers().stop(1);
    }
    if(e.id==1){ //sprawdź czy król jest
        var ents = API.getIWorlds()[0].getNearbyEntities(e.block.getPos(), 5, 1);
        if(checknearby(ents)==false){
            king="";
            wdata.put('king',"");
            broadcast("Król zszedł z tronu!");
            var timers = e.block.getTimers();
            timers.stop(1);
            e.block.setModel("minecraft:gold_block");
        }
    }
}

function checknearby(ents){
    for(var i=0; i<ents.length; i++){
        if(ents[i].getName() == king){
            return true;
        }    
    }
    return false;
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