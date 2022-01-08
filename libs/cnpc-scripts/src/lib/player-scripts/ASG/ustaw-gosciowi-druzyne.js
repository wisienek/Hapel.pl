function attack(e){
    var data = e.player.world.getStoreddata();
    var mainh = e.player.getMainhandItem();
    var lore = mainh.getLore();
    if(lore.length==0){return mainh.setLore(["Galeoniarze"])}else{
        var teams = data.get("teams");
        var i = teams.indexOf(lore[0]);
        if(i==-1){return e.player.message("coś nie tak")}
        mainh.setLore([teams[i]]);
        return e.player.message("Zmieniono na: "+teams[i]);
    }

}

function interact(e){
    var mainh = e.player.getMainhandItem();
    var lore = mainh.getLore();
    if(lore.length==0){return e.player.message("w 1 linijce opisu nie ma nazwy teamu")}
    var target;
    if(e.type==1 && e.target.getTypeName()!="CustomNpc"){
        target=e.target;
    }else{return e.player.message("Nie znaleziono gracza ;/")}
    if(target){
        var sc = e.player.world.getScoreboard();
        var team = sc.getTeam(lore[0]);
        team.addPlayer(target.getName());
        return e.player.message("Dodano "+target.getName()+" do drużyny "+team.getDisplayName());
    }
}