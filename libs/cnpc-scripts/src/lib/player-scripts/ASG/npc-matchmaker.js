function dialogOption(e) {
  var data = e.player.world.getStoreddata();
  var sc = e.player.world.getScoreboard();
  var mainh = e.player.getMainhandItem();
  var ts = data.get('teams').split(',');
  var opt = e.option.getSlot() + 1;

  switch (opt) {
    case 1: {
      //give player item to set spawnpoints
      var chest = e.player.world.getBlock(48492, 79, 52792);
      if (chest.getName().indexOf('chest') > -1) {
        var cont = chest.getContainer();
        var items = cont.getItems();
        for (var x in items) {
          if (items[x].getDisplayName().indexOf('spawnpointów') > -1) {
            return e.player.giveItem(items[x]);
          }
        }
        return e.player.message('Nie znaleziono itemu ;<');
      } else {
        return e.player.message('Nie znaleziono skrzyni');
      }
    }
    case 2: {
      //max-ppl
      if (mainh.getName() == 'air') {
        return e.player.message('Nic nie trzymasz!!');
      }
      var lore = mainh.getLore();
      if (lore.length > 0) {
        if (!isNaN(Number(lore[0]))) {
          data.put('max-ppl', Number(lore[0]));
          return e.player.message('Dodano ' + lore[0] + ' do max-ppl');
        } else {
          return e.player.message('Nie numer, lore[0]');
        }
      } else {
        return e.player.message(
          'Musisz trzymać item z opisem. W pierwszej linijce musi być liczba osób'
        );
      }
    }
    case 3: {
      //max-score to win
      if (mainh.getName() == 'air') {
        return e.player.message('Nic nie trzymasz!!');
      }
      var lore = mainh.getLore();
      if (lore.length > 0) {
        if (!isNaN(Number(lore[0]))) {
          data.put('high', Number(lore[0]));
          return e.player.message('Dodano ' + lore[0] + ' do max-pkt');
        } else {
          return e.player.message('Nie numer, lore[0]');
        }
      } else {
        return e.player.message(
          'Musisz trzymać item z opisem. W pierwszej linijce musi być liczba punktów'
        );
      }
    }
    case 4: {
      //start match
      if (data.get('mecz') == 'start') {
        return e.player.message('[§cASG§f] §7Gra jest już aktywna!');
      }
      var chests = [48499, 82, 52790];
      for (var x = 0; x < ts.length; x++) {
        if (!data.get(ts[x] + '-spawn')) {
          return e.player.message('[§cASG§f] §7Nie ma spawnu: ' + ts[x]);
        }
        if (!data.get(ts[x] + '-flaga')) {
          return e.player.message('[§cASG§f] §7Nie ma flagi: ' + ts[x]);
        }
        var block = e.player.world.getBlock(
          data.get(ts[x] + '-flaga')[0],
          data.get(ts[x] + '-flaga')[1],
          data.get(ts[x] + '-flaga')[2]
        );
        if (block) {
          var blockdata = block.getStoreddata();
          blockdata.put(ts[x] + '-f', 0);
          blockdata.put(ts[x], 0);
        }
        data.put(ts[x], 0);
        var team = sc.getTeam(ts[x]);
        var players = team.getPlayers();
        var chest = e.player.world
          .getBlock(chests[0], chests[1] - x, chests[2])
          .getContainer();
        var items = chest.getItems();
        for (var y = 0; y < players.length; y++) {
          for (var z = 0; z < items.length; z++) {
            var p = e.player.world.getPlayer(players[y]);
            if (p) {
              p.giveItem(items[z]);
              var pos1 = data.get(ts[x] + '-spawn').split(' ');
              p.setPosition(pos1[0], pos1[1], pos1[2]);
            }
          }
        }
      }
      data.put('mecz', 'start');
      return powiadom(e.player.world, '[§cASG§f] §7Mecz rozpoczął się!');
    }
    case 5: {
      //end match
      if (data.get('mecz') == 'stop') {
        return e.player.message('[§cASG§f] §7Gra jest już zatrzymana!');
      }
      data.put('mecz', 'stop');
      for (var x = 0; x < ts.length; x++) {
        var team = sc.getTeam(ts[x]);
        team.clearPlayers();
      }
      return powiadom(e.player.world, '[§cASG§f] §7Mecz Zakończył się!');
    }
    case 6: {
      //get match info
      e.player.message('============================');
      e.player.message('§a§lMax PPL: §b' + data.get('max-ppl'));
      e.player.message('§a§lMax PKT: §b' + data.get('high'));
      e.player.message('§a§lState: §b' + data.get('mecz'));
      var sc = e.player.world.getScoreboard();
      var teams = sc.getTeams();
      e.player.message('--------------------§cPunkty (gracze)');
      for (var x = 0; x < teams.length; x++) {
        e.player.message(
          '§a§l' +
            teams[x].getDisplayName() +
            ' : §b' +
            data.get(teams[x].getDisplayName()) +
            ' (' +
            teams[x].getPlayers().length +
            ')'
        );
      }
      e.player.message('--------------------§cSpawn');
      for (var x = 0; x < teams.length; x++) {
        e.player.message(
          '§a§l' +
            teams[x].getDisplayName() +
            ': §b' +
            data.get(teams[x].getDisplayName() + '-spawn')
        );
      }
      e.player.message('--------------------§cFlagi');
      for (var x = 0; x < teams.length; x++) {
        e.player.message(
          '§a§l' +
            teams[x].getDisplayName() +
            ': §b' +
            data.get(teams[x].getDisplayName() + '-flaga')
        );
      }
      return;
    }

    default:
      e.player.message('Nic nie wybrano');
  }
}

function powiadom(world, wiadomosc) {
  var teams = world.getScoreboard().getTeams();
  for (var x = 0; x < teams.length; x++) {
    var team = teams[x];
    var players = team.getPlayers();
    for (var y = 0; y < players.length; y++) {
      var player = world.getPlayer(players[y]);
      if (player) {
        player.message(wiadomosc);
      }
    }
  }
}
