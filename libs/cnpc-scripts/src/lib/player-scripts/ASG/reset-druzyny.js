function interact(e){
    var sc = e.player.world.getScoreboard();
    var dr =sc.getPlayerTeam(e.player.getName());
    if(dr){
        dr = dr.getDisplayName();
        sc.getTeam(dr).removePlayer(e.player.getName());
        return e.player.message("[§cASG§f] §7Usunięto z drużyny: "+dr);
    }else{return e.player.message("[§cASG§f] §7Nie masz drużyny!")}
}