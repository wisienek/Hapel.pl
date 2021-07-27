function damaged(e){
    if(e.damageSource.isProjectile()==true){
        var atakuje = e.source;
        var mainh = atakuje.getMainhandItem();
        var temp = e.player.world.getStoreddata();
        if((mainh.getDisplayName()=="§cMagiczny łuk" || mainh.getDisplayName()=="§cMagiczny Pistolecik") && temp.get("mecz")=="start"){
            e.player.setHealth(e.player.getMaxHealth());
            var sc = e.player.world.getScoreboard();
            var teamp = sc.getPlayerTeam(e.player.getName());
            var teama = sc.getPlayerTeam(atakuje.getName());
            if(!teama || !teamp){return atakuje.message("[§cASG§f] §7Gość nie gra w grze!")}
            if(teamp && teamp != teama){
                var data = temp.get(teama.getDisplayName());
                data+=1;
                temp.put(teama.getDisplayName(),data);
                var bullet = e.player.world.createItem("variedcommodities:bullet",0,5);
                atakuje.giveItem(bullet);
                powiadom(e.player.world,"[§cASG§f] §e"+atakuje.getDisplayName()+" §b("+teama.getDisplayName()+")§7 zdobył punkt przez trafienie: §e"+e.player.getDisplayName()+" §b("+teamp.getDisplayName()+")");
                var spawnp = temp.get(teamp.getDisplayName()+"-spawn").split(" ");
                e.player.setPos(API.getIPos(spawnp[0],spawnp[1],spawnp[2]));
                if(data>=temp.get("high")){
                    temp.put("mecz","stop");
                    powiadom(e.player.world,"[§cASG§f] §7Mecz zakończony, §e"+teama.getDisplayName()+"§7 Wygrywa mecz!");
                    var teams = temp.get("teams").split(",");
                    for(var x=0;x<teams.length;x++){
                        var team = sc.getTeam(teams[x]);
                        team.clearPlayers();
                        temp.put(team.getDisplayName(),0);
                        temp.remove(team.getDisplayName()+"-spawn")
                    }
                }
                return;
            }
        }
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