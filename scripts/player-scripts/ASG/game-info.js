function interact(e){
    var data = 	e.player.world.getStoreddata();
    e.player.message("============================");
    e.player.message("§a§lMax PPL: §b"+data.get("max-ppl"));
    e.player.message("§a§lMax PKT: §b"+data.get("high"));
    e.player.message("§a§lState: §b"+data.get("mecz"));
    var sc = e.player.world.getScoreboard();
    var teams = sc.getTeams();
    e.player.message("--------------------§cPunkty (gracze)");
    for(var x=0;x<teams.length;x++){
        e.player.message("§a§l"+teams[x].getDisplayName()+" : §b"+data.get(teams[x].getDisplayName()) + " ("+teams[x].getPlayers().length+")");
    }
    e.player.message("--------------------§cSpawn");
    for(var x=0;x<teams.length;x++){
        e.player.message("§a§l"+teams[x].getDisplayName() +": §b"+data.get(teams[x].getDisplayName()+"-spawn"));
    }
    e.player.message("--------------------§cFlagi");
    for(var x=0;x<teams.length;x++){
        e.player.message("§a§l"+teams[x].getDisplayName() +": §b"+data.get(teams[x].getDisplayName()+"-flaga"));
    }
}