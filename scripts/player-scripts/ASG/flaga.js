var sc;
var data;
function init(e){
    sc = e.block.world.getScoreboard();
    data = e.block.world.getTempdata();
    var data12 = e.block.getStoreddata();

    e.block.getStoreddata().put("team","Galeoniarze");
    if(!data12.get(data12.get("team")+"-f") || data12.get(data12.get("team")+"-f")==0){
        e.block.getStoreddata().put(e.block.getStoreddata().get("team")+"-f",0);
        e.block.setModel("minecraft:diamond_block");
    }else{
        e.block.setModel("minecraft:netherrack");
    }
}

function tick(e){
    runDelayTick();
    var data12 = e.block.getStoreddata();
    if(!data12.get(data12.get("team")+"-f") || data12.get(data12.get("team")+"-f")==0){
        e.block.getStoreddata().put(e.block.getStoreddata().get("team")+"-f",0);
        e.block.setModel("minecraft:diamond_block");
    }else{
        e.block.setModel("minecraft:netherrack");
    }
    //repair armour
    var players = 	e.block.world.getNearbyEntities(e.block.getPos(), 6, 1);
    if(players && players.length>0){
        for(var x=0;x<players.length;x++){
        var p = players[x];
            for(var y=0;y<=3;y++){
                 var arm = p.getArmor(y);
                 if(arm && arm.getItemDamage()>0){
                     arm.setItemDamage(0);
                 }
            }
        }
    }

}

function interact(e){
    sc = e.block.world.getScoreboard();
    data = e.block.world.getTempdata();
    var data1 = e.block.world.getStoreddata();
    var data11 = e.block.getStoreddata();
    var team = sc.getPlayerTeam(e.player.getName());
    var bteam = e.block.getStoreddata().get("team");
    var mainh = e.player.getMainhandItem();

    if(data1.get("mecz")=="stop"){return e.player.message("[§cASG§f] §7Mecz nie wystartował, flaga drużyny: §b"+data11.get("team"))}
    if(mainh.getDisplayName().indexOf("Reset Flagi")>-1){return}
    if(mainh.getDisplayName().indexOf("Ustawianie flag")>-1){return}
    if(!bteam){return e.player.message("[§cASG§f] §7Flaga nie ma ustawionego teamu.")}
    if(!team){return e.player.message("[§cASG§f] §7Nie jesteś w żadnej drużynie, nie możesz przejądź flagi!")}
    if(team.getDisplayName()==bteam){
        if(mainh.getDisplayName().indexOf("Flaga drużyny")>-1 && mainh.getDisplayName().indexOf(team)==-1){
            mainh.setStackSize(0);
            var pkt = data1.get(team.getDisplayName());
            data1.put(team.getDisplayName(),pkt+15);
            powiadom(e.block.world,"[§cASG§f] §e"+e.player.getDisplayName()+"§7 Zdobył §c15 punktów§7 dla: §b"+team.getDisplayName()+"§7 za przejęcie flagi §b"+mainh.getDisplayName().split(":")[1]+"§7 !");
            if(pkt>=data1.get("high")){
                data1.put("mecz","stop");
                powiadom(e.block.world,"[§cASG§f] §7Mecz zakończony, §b"+team.getDisplayName()+"§7 Wygrywa mecz!");
                var teams = data1.get("teams").split(",");
                for(var x=0;x<teams.length;x++){
                    var team1 = sc.getTeam(teams[x]);
                    team1.clearPlayers();
                    data1.put(team1.getDisplayName(),0);
                    data1.remove(team1.getDisplayName()+"-spawn")
                }
            }
        }else{
            return e.player.message("[§cASG§f] §7Nie możesz zabrać własnej flagi!");
        }
    }else if(team.getDisplayName()!=bteam && data11.get(bteam+"-f")==0){
        var flaga = e.block.world.createItem("variedcommodities:silk",0,1);
        flaga.setCustomName("§cFlaga drużyny: §b"+bteam);
        e.block.setModel("minecraft:netherrack");
        data11.put(bteam+"-f",1);
        powiadom(e.block.world,"[§cASG§f] §e"+e.player.getDisplayName()+"§7 Porwał flagę §b"+bteam+"!");
        //świecenie
        var nbt = e.player.entityNbt;
        nbt.setByte("Glowing",1);
        e.player.setEntityNbt(nbt);
        runDelay(20, function(){
            nbt = e.player.entityNbt;
            nbt.setByte("Glowing",0);
            e.player.setEntityNbt(nbt);
        });
        return e.player.giveItem(flaga);
    }
}

var _TIMERS = [];

function runDelay(seconds, callback) {
    _TIMERS.push({
        end: new Date().getTime()+seconds*1000,
        callback: callback
    });
}

function runDelayTick() {
    if(_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();
 
        var timer;
        for(var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if(_curTime >= timer.end) {
                timer.callback();
            } else {
                _newTimers.push(timer);
            }
        }
        _TIMERS = _newTimers;
    }
}

function powiadom(world,wiadomosc){
    var teams = world.getScoreboard().getTeams();
    for(var x=0;x<teams.length;x++){
        var team = teams[x];
        var players = team.getPlayers();
        for(var y=0;y<players.length;y++){
            var player = world.getPlayer(players[y]);
            if(player){
                player.message(wiadomosc);
            }
        }
    }
}