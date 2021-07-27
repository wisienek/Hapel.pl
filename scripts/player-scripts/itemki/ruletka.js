
function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName()=="variedcommodities:letter" && mainh.getDisplayName().indexOf("Przepustka do pokoju VIP")>-1){
        var lore = mainh.getLore();
        if(lore.length<2){return e.player.message("Przepustka bez właściciela")}else{
            if(lore[1].indexOf(e.player.getName())==-1){return e.player.message("[§cGringott§f] §7Przepustka należy do: "+lore[1]+"§7. Nie możesz jej użyć.")}
        }
        var players = e.player.world.getNearbyEntities(47636,142,52673, 15, 1);
        for(var x=0;x<players.length;x++){
            if(players[x].getName()==e.player.getName()){
                e.player.clearRiders();
                var pos = e.player.getPos();
                var data = e.player.getStoreddata();
                data.put("karnetGringot", "["+pos.getX()+","+pos.getY()+","+pos.getZ()+"]");
                e.player.setPosition(47636,142,52673);
                return e.player.message("[§cGringot§f] §7Przeniesiono do VIP-roomu gringota!");
            }
        }
        return e.player.message("[§cGringot§f] §7Jesteś za daleko VIP-roomu!");
    }
}
function attack(e){
    if(mainh.getName()=="variedcommodities:letter" && mainh.getDisplayName().indexOf("Przepustka do pokoju VIP")>-1){
        var lore = mainh.getLore();
        if(lore.length<2){return e.player.message("Przepustka bez właściciela")}else{
            if(lore[1].indexOf(e.player.getName())==-1){return e.player.message("[§cGringott§f] §7Przepustka należy do: "+lore[1]+"§7. Nie możesz jej użyć.")}
        }
        var players = e.player.world.getNearbyEntities(47636,142,52673, 15, 1);
        for(var x=0;x<players.length;x++){
            if(players[x].getName()==e.player.getName()){
                var data = e.player.getStoreddata();
                var pos = data.get("karnetGringot");
                if(pos&&pos.length>0){
                    pos = JSON.parse(pos);
                    e.player.setPosition(pos[0],pos[1],pos[2]);
                    return e.player.message("[§cGringot§f] §7Przeniesiono spoworotem!")
                }else{
                    return e.player.message("Wystąpił jakiś błąd ;v");
                }
            }
        }
        return e.player.message("[§cGringot§f] §7Jesteś za daleko VIP-roomu");
    }

}