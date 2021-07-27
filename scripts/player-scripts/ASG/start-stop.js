function attack(e){
    var lore = e.item.getLore();
    lore[0]=="start"?e.item.setLore(["stop"]):e.item.setLore(["start"]);
    return e.player.message("Zmieniono: "+e.item.getLore()[0]);
}

function interact(e){
    var data = e.player.world.getStoreddata();
    var sc = e.player.world.getScoreboard();
    var lore = e.item.getLore();
    var ts = data.get("teams").split(",");
    if(lore[0]=="start"){
        if(data.get("mecz")=="start"){return e.player.message("[§cASG§f] §7Gra jest już aktywna!")}
        var chests = [48499,82,52790];
        for(var x=0;x<ts.length;x++){
            if(!data.get(ts[x]+"-spawn")){return e.player.message("[§cASG§f] §7Nie ma spawnu: "+ts[x])}
            if(!data.get(ts[x]+"-flaga")){return e.player.message("[§cASG§f] §7Nie ma flagi: "+ts[x])}
            var block = e.player.world.getBlock(data.get(ts[x]+"-flaga")[0],data.get(ts[x]+"-flaga")[1],data.get(ts[x]+"-flaga")[2]);
            if(block){
                var blockdata = block.getStoreddata();
                blockdata.put(ts[x]+"-f",0);
                blockdata.put(ts[x],0);
            }
            data.put(ts[x],0);
            var team = sc.getTeam(ts[x]);
            var players = team.getPlayers();
            var chest = e.player.world.getBlock(chests[0],chests[1]-x,chests[2]).getContainer();
            var items = chest.getItems();
            for(var y=0;y<players.length;y++){
                for(var z=0;z<items.length;z++){
                    var p = e.player.world.getPlayer(players[y])
                    if(p){
                        p.giveItem(items[z]);
                        var pos1= data.get(ts[x]+"-spawn").split(" ");
                        p.setPosition(pos1[0],pos1[1],pos1[2]);
                    }
                }
            }
        }
        data.put("mecz","start");
        return powiadom(e.player.world,"[§cASG§f] §7Mecz rozpoczął się!");
    }else if(lore[0]=="stop"){
        if(data.get("mecz")=="stop"){return e.player.message("[§cASG§f] §7Gra jest już zatrzymana!")}
        data.put("mecz","stop");
        for(var x=0;x<ts.length;x++){
            var team = sc.getTeam(ts[x]);
            team.clearPlayers();
        }
        return powiadom(e.player.world,"[§cASG§f] §7Mecz Zakończył się!");
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