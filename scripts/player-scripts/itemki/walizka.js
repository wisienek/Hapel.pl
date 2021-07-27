function attack(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName() == "§cWalizka"){
        var target;
        if(e.type==1 && e.target.getTypeName()!="CustomNpc"){
            target=e.target;
        }else{
            target=e.player;
        }
        var lore = mainh.getLore();
        if(lore[1]=="§9Wejście"){
            var posl = mainh.getLore()[2].split("§0")[1].split(" ");
            var pos = API.getIPos(posl[0],posl[1],posl[2]);
            target.setPos(pos);
            return e.player.message("[§cWalizka&f] &7Wszedłeś do walizki! ");
        }else if(lore[1]=="§9Wyjście"){
            if(lore.length<4){return e.player.message("[§cWalizka&f] &7Nie zapisano wyjścia!")}
            var posl = mainh.getLore()[3].split("§0")[1].split(" ");
            var pos = API.getIPos(posl[0],posl[1],posl[2]);
            target.setPos(pos);
            return e.player.message("[§cWalizka&f] &7Wyszedłeś z walizki! ");
        }else if(lore[1]=="§9Zmiana Wyjścia"){
            var pos = e.player.getPos();
            var lore1=[];
            for(var x=0;x<lore.length;x++){
                lore1.push(lore[x]);
            }
            lore1[3]="§0"+pos.getX()+" "+pos.getY()+" "+pos.getZ();
            mainh.setLore(lore1);
        }else{
            return e.player.message("coś nie tak! Napisz do: Woolf / Prześladowca");
        }
    }
}

function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§cWalizka"){
        var lore = mainh.getLore();
        var lore1=[];
        var w;
        for(var x=0;x<lore.length;x++){
            if(lore[x]=="§9Wejście"){
                lore1.push("§9Wyjście");
                w="Wyjście";
            }else if(lore[x]=="§9Wyjście"){
                lore1.push("§9Zmiana Wyjścia");
                w="Zmiana Wyjścia";
            }else if(lore[x]=="§9Zmiana Wyjścia"){
                lore1.push("§9Wejście");
                w="Wejście";
            }else{
                lore1.push(lore[x]);
            }
        }
        mainh.setLore(lore1);
        return e.player.message("[§cWalizka&f] &7Zmieniono akcję na: "+w);
    }
}