function attack(e){
var lore = e.item.getLore();
var x = Number(lore[0]);
if(x==3){x=0}else{
    x++;
}
e.item.setLore([x]);
}

function interact(e){
    var data = 	e.player.world.getStoreddata();
    var sc = e.player.world.getScoreboard();
    var teams = data.get("teams").split(",");
    var team = sc.getTeam(teams[Number(e.item.getLore()[0])]);
    var players = team.getPlayers();
    for(var x=0;x<players.length;x++){
        e.player.message(players[x]);
    }
}