function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName().indexOf("air")>-1){return e.player.message("[§cAdmin§f] §7Nic nie trzymasz!")}
    var players = e.player.world.getAllPlayers();

    for(var i=0; i<players.length; i++){
        var x = players[i].getInventory().count(mainh, false, false)
        if(x>0){
            e.player.message("[§cAdmin§f] §7Gracz §b"+players[i].getName()+" §7Ma item "+mainh.getDisplayName()+"§r§7 (§9§l"+x+"§7)");
        }
    }
    
}