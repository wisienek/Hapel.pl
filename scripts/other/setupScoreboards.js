function interact(e){
    if(e.player.isSneaking()) return;

    var sc = e.player.world.getScoreboard();
    var teams = sc.getTeams();

    var adm = sc.addTeam("HeadAdmin");
    adm.setDisplayName("&1[H@]&c");
    adm.addPlayer(e.player.getName());


    for(var i=0; i<teams.length; i++) {
        e.player.message( teams[ i ].getName() )
    }

    return ;





}