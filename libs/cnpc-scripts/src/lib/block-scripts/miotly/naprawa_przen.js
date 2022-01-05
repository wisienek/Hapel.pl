function init(e) {
  e.item.setItemDamage(29);
  e.item.setTexture(29, 'littletiles:wrench');
  e.item.setDurabilityShow(false);
}

function interact(e) {
  if (e.player.isSneaking()) return;
  var data = e.item.getStoreddata();
  var opt = data.get('opt');
  if (opt) {
    if (opt == 'naprawa') {
      data.put('opt', 'konserwacja');
      e.player.message('[§cNarzędzia§f] §7Zmieniono tryb na konserwację');
    } else if (opt == 'konserwacja') {
      data.put('opt', 'naprawa');
      e.player.message('[§cNarzędzia§f] §7Zmieniono tryb na naprawę');
    }
  } else {
    data.put('opt', 'naprawa');
  }
  return;
}

function attack(e) {
  var mainh = e.player.getOffhandItem();
  if (mainh.getName().toLowerCase().indexOf('air') > -1)
    return e.player.message(
      '[§cNarzędzia§f] §7Musisz trzymać miotłę w 2 ręce!'
    );

  var lore = mainh.getLore();
  var data = e.item.getStoreddata();
  var opt = data.get('opt');
  if (opt == 'naprawa') {
    if (mainh.getName() == 'variedcommodities:broken_arrow') {
      var data = e.item.getStoreddata();
      var time = data.get('naprawa') || 0;
      if (time > Date.now()) {
        return e.player.message(
          '[§cMiotły§f] §7Możesz naprawiać miotłę co 3 godziny!'
        );
      }

      var miotly = JSON.parse(e.player.world.getStoreddata().get('miotly'));
      if (!miotly) {
        return e.player.message(
          '[§cMiotły§f] §7Nie znaleziono spisu mioteł!!!'
        );
      }

      var name = mainh.getDisplayName().split(' ').join('').replace(/§f/g, '');
      var item = e.player.world.createItem(miotly[name], 0, 1);
      item.setCustomName(mainh.getDisplayName());
      item.setLore(Java.from(lore));
      mainh.setStackSize(mainh.getStackSize() - 1);
      e.player.giveItem(item);
      data.put('naprawa', JSON.stringify(Date.now() + 3600000 * 3));

      var x =
        '**' +
        e.player.getName() +
        '** Naprawił miotłę narzędziami: **' +
        name +
        '** !';
      x = ang(x);
      HTTP.post(passes.hooks.mainLog, {
        content: x,
        tts: false,
      });
    } else {
      return e.player.message(
        '[§cNarzędzia§f] §7Musisz mieć złamaną miotłę w drugiej ręce!'
      );
    }
  } else if (opt == 'konserwacja') {
    var lore1 = Java.from(lore);

    for (var x = 0; x < lore1.length; x++) {
      if (lore[x].toLowerCase().indexOf('wytrzymałość: ') > -1) {
        var wdata = e.player.world.getStoreddata();
        var wyt = wdata.get('miotly_wyt');
        wyt = JSON.parse(wyt) || {};
        var value = 5;
        if (wyt && wyt[mainh.getName()])
          value = wyt[mainh.getName()].wytrzymalosc;

        if (lore[x].split(': ')[1] == value)
          return e.player.message(
            '[§cMiotła§f] §7Twoja miotła ma pełną wytrzymałość!'
          );

        lore1[x] = '§cWytrzymałość: ' + value;
        e.player.message('[§cMiotła§f] §7Konserwacja przebiegła poprawnie!');
        break;
      }
    }
    mainh.setLore(lore1);
  } else {
    return e.player.message('[§cNarzędzia§f] §7Brak opcji!');
  }
}
