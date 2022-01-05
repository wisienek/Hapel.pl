function attack(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§cGwizdek"){
        var lore = mainh.getLore();
        var opt = lore[0].split("§0")[1];
        if(opt==0){
            e.player.message("§c[Gwizdek]§7 Wybrałeś opcję 1: powiadomienie o niebezpieczeństwu");
            lore[0]="§01";
        }else{
            e.player.message("§c[Gwizdek]§7 Wybrałeś opcję 2: powiadomienie o chęci wejścia");
            lore[0]="§00";
        }
        return mainh.setLore(lore);
    }
}

function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§cGwizdek"){
        var stefan = e.player.world.getEntity("9bface2a-6576-46be-9da5-c6bb767bbbc7");
        var pos = e.player.getPos();
        var bpos = [[89,90,83],[9,119,243],[24,82,473],[157,72,265]];
        var sblok;
        var dist;
        var opt = mainh.getLore()[0].split("§0")[1];
        for(var x in bpos){
            var blok = e.player.world.getBlock(bpos[x][0],bpos[x][1],bpos[x][2]);
            var dist1 = pos.distanceTo(blok.getPos());
            if(dist>dist1 || dist==undefined){
                dist=dist1;
                if(x==0){sblok="obozu";}
                else if(x==1){sblok="biblioteki"}
                else if(x==2){sblok="błoni"}
                else if(x==3){sblok="kozy"}
            }
        }
    
        if(!stefan){
            e.player.message("Stefan nie usłyszał gwizdka");
            return;
        }else{
            e.player.message("Stefan usłyszał gwizdek!");
            if(opt==1){
                stefan.say("§7hej, mamy kłopot! (§e"+e.player.getDisplayName()+"§7, najbliżej przejścia: §c"+sblok+" ["+parseInt(dist)+"m]§7)");
            }else{
                stefan.say("§e"+e.player.getDisplayName()+"§7 chce wejść! jest najbliżej wejścia:§c "+sblok+" ["+parseInt(dist)+"m]");
            }
            return;
        }
    }
}