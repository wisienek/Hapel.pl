function dialogOption(e) {
  var data = e.player.world.getStoreddata();
  var wioski = data.get('Bus-Wioski');
  var opt = e.option.getSlot();
  var name = e.option.getName();
  if (!wioski) {
    return e.player.message(
      '[§cPrzewoźnik§f] §7Coś poszło nie tak, brak zapisanych stopów!'
    );
  }
  wioski = JSON.parse(wioski);
  opt += 1;
  if (name != 'Więcej opcji') {
    var w1 = wioski[name];
    if (!w1) {
      return e.player.message('[§cPrzewoźnik§f] §7Nie znaleziono stopa!');
    }

    if (maKase(e.player) == false) {
      return e.player.message(
        '[§cPrzewoźnik§f] §7Musisz mieć knuta na przejazd!'
      );
    }

    e.player.message(
      '[§cPrzewoźnik§f] §7Podróż zakończona, jesteś w: ' + name + '!'
    );
    e.player.setPosition(w1[0], w1[1], w1[2]);
    return;
  }
}

function maKase(player) {
  var inv = player.getInventory();
  var items = inv.getItems();
  for (var x = 0; x < items.length; x++) {
    if (items[x].getDisplayName().indexOf('Knut') > -1) {
      var i = items[x];
      i.setStackSize(i.getStackSize() - 1);
      return true;
    }
  }
  return false;
}
