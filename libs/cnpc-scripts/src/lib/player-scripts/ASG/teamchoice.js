function interact(e) {
  var sc = e.player.world.getScoreboard();
  var data = e.player.world.getStoreddata();
  var dr = e.npc.getName().split('do ')[1];

  if (!sc.getPlayerTeam(e.player.getName())) {
    var team = sc.getTeam(dr);
    if (data.get('max-ppl') <= team.getPlayers().length + 1) {
      return e.player.message('[§cASG§f] §7Drużyna jest pełna!');
    }
    team.addPlayer(e.player.getName());
    if (data.get('mecz') == 'start') {
      var ts = data.get('teams').split(',');
      for (var x = 0; x < ts.length; x++) {
        if (dr == ts[x]) {
          var chests = [48499, 82, 52790];
          var chest = e.player.world
            .getBlock(chests[0], chests[1] - x, chests[2])
            .getContainer();
          var items = chest.getItems();
          for (var z = 0; z < items.length; z++) {
            e.player.giveItem(items[z]);
            var pos1 = data.get(ts[x] + '-spawn').split(' ');
            e.player.setPosition(pos1[0], pos1[1], pos1[2]);
          }
        }
      }
    }
    return e.player.message('[§cASG§f] §7Dodano do drużyny: §e' + dr);
  } else {
    return e.player.message(
      '[§cASG§f] §7Masz już drużynę, napisz do nadzorującego o zmianę. (' +
        sc.getPlayerTeam(e.player.getName()).getDisplayName() +
        ')'
    );
  }
}
