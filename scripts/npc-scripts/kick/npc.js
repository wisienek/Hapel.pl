function interact(e){
    var riders = e.player.getAllRiders();

    if(riders && riders.length>0){
        for(var x=0;x<riders.length;x++){
            if(riders[x].getName().indexOf("Szczęśliwy zajączek")>-1){
                var npc = riders[x];
                e.player.clearRiders();
                npc.despawn();

                e.player.stopQuest(8);
                
                var items = getChestItems(e.player,48506,79,52794);
                if(!items){return e.player.message("[§cZając§f] §7Wystąpił Błąd. Napisz do @Woolf#9981")}
                for(var y=0;y<items.length;y++){
                    e.player.giveItem(items[y]);
                }
                e.player.message("[§cZając§f] §7Gratulacje, jako pierwszy ukończyłeś zadanie!")
            }
        }
    }
}




function getChestItems(player,x,y,z){
    var chest = player.world.getBlock(x,y,z);
    if(chest.getName().toLowerCase().indexOf("air")==-1){
        var cont = chest.getContainer();
        return cont.getItems();
    }
    return;
}