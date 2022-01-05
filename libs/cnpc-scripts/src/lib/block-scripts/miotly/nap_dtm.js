var akcje = false;
function init(e) {
  e.block.setModel('minecraft:anvil');
}

function interact(e) {
  if (akcje == true) {
    return e.player.message(
      '[§cMiotły§f] §7Musisz przesłać zaległe akcje aby odblokować narzędzie'
    );
  }
  var players = e.player.world.getStoreddata().get('miotlarstwo');
  if (players && players.indexOf(e.player.getName()) > -1) {
    var mainh = e.player.getMainhandItem();
    var lore = Java.from(mainh.getLore());
    if (mainh.getName() == 'variedcommodities:broken_arrow') {
      var data = e.block.getStoreddata();
      var time = data.get('naprawa');
      if (time) {
        time = new Date(Number(time));
        var date = new Date(Date.now());
        var v = (date - time) / 3600000;
        if (v < 2) {
          return e.player.message(
            '[§cMiotły§f] §7Możesz naprawiać miotłę co 3 godziny! (' +
              (3 - v).toFixed(2) +
              ')'
          );
        }
      }
      var miotly = JSON.parse(e.player.world.getStoreddata().get('miotly'));
      if (!miotly) {
        return e.player.message(
          '[§cMiotły§f] §7Nie znaleziono spisu mioteł!!!'
        );
      }
      var name = mainh.getDisplayName().split(' ').join('').replace(/§./g, '');
      var item = e.player.world.createItem(miotly[name], 0, 1);
      item.setCustomName(mainh.getDisplayName());

      lore.pop();
      item.setLore(lore);

      mainh.setStackSize(mainh.getStackSize() - 1);
      e.player.giveItem(item);
      data.put('naprawa', JSON.stringify(Date.now()));
      var x =
        '**' + e.player.getName() + '** Naprawił miotłę: **' + name + '** !';
      x = ang(x);
      HTTP.post(passes.hooks.mainLog, {
        content: x,
        tts: false,
      });
    }
  }
}
function clicked(e) {
  if (akcje == true) {
    return e.player.message(
      '[§cMiotły§f] §7Musisz przesłać zaległe akcje aby odblokować narzędzie'
    );
  }
  var players = e.player.world.getStoreddata().get('miotlarstwo');
  if (players && players.indexOf(e.player.getName()) > -1) {
    var mainh = e.player.getMainhandItem();
    var lore = mainh.getLore();
    var lore1 = [];
    for (var x = 0; x < lore.length; x++) {
      if (lore[x].toLowerCase().indexOf('wytrzymałość: ') > -1) {
        var wdata = e.player.world.getStoreddata();
        var wyt = wdata.get('miotly_wyt');
        wyt = JSON.parse(wyt) || {};
        var value = 5;
        if (wyt && wyt[mainh.getName()]) {
          value = wyt[mainh.getName()].wytrzymalosc;
        }
        if (lore[x].split(': ')[1] == value) {
          return e.player.message(
            '[§cMiotła§f] §7Twoja miotła ma pełną wytrzymałość!'
          );
        }
        lore1.push('§cWytrzymałość: ' + value);
        e.player.message('[§cMiotła§f] §7Konserwacja przebiegła poprawnie!');
      } else {
        lore1.push(lore[x]);
      }
    }
    mainh.setLore(lore1);
  }
}
