function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName() == "§cKarteczka ze spellem"){
        if(mainh.getLore().length!=3){return e.player.message("Coś poszło nie tak!")}
        if(e.player.getRiders().length>0){e.player.clearRiders()}
        var posl = mainh.getLore()[2].split("§0")[1].split(" ");
        var pos = API.getIPos(posl[0],posl[1],posl[2]);
        e.player.setPos(pos);
        e.player.message("[§cSpellbook&f] &7Użyłeś karteczki do: "+mainh.getLore()[1]);
        return mainh.setStackSize(mainh.getStackSize()-1);
    }
}